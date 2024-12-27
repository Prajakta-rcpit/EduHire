// College
const { College, Teacher, Vacancy } = require("./model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerCollege = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingCollege = await College.findOne({ email });
    if (existingCollege) {
      return res.status(400).json({
        success: false,
        message: "User Already Exist",
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const college = await College.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(200).json({
      success: true,
      message: "College Created Successfully",
      college,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while registering the college",
    });
  }
};

exports.loginCollege = async (req, res) => {
  try {
    const { email, password } = req.body;

    const college = await College.findOne({ email });
    if (!college) {
      return res.status(404).json({
        success: false,
        message: "No college with Email found plz Register first",
      });
    }

    const payload = {
      email: college.email,
      name: college.name,
      id: college._id,
      role: college.role,
    };

    if (await bcryptjs.compare(password, college.password)) {
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "4h",
      });

      (college.token = token), (college.password = undefined);

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        college,
        message: "User Logged in Successfully",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while logging the college account",
    });
  }
};

exports.logout = (req, res) => {
  try {
    res.clearCookie("token", {});

    return res.status(200).json({
      success: true,
      message: "User Logged Out Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error Something went wrong while Logging out",
      error: error.message,
    });
  }
};

exports.addVacancy = async (req, res) => {
  try {
    const collegeId = req.user.id;
    const { title, department, description, qualifications, lastDate } =
      req.body;

    const vacancy = await Vacancy.create({
      title,
      department,
      description,
      qualifications,
      lastDate,
      college: collegeId,
    });

    return res.status(200).json({
      success: true,
      message: "Vacancy Created Successfully ",
      vacancy,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while adding Vacany",
    });
  }
};

exports.getVacancies = async (req, res) => {
  try {
    const collegeId = req.user.id;

    const vacancies = await Vacancy.find({ college:collegeId });

    return res.status(200).json({
      success: true,
      message: "Vancancies retrieved successfully.",
      vacancies,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while adding Vacany",
    });
  }
};

exports.getVacancyById = async (req, res) => {
  try {
    const vacancyId = req.params.id; // Corrected typo here
    const vacancy = await Vacancy.findOne({ _id: vacancyId }).populate("applicants").exec();
    

    
    if (!vacancy) {
      return res.status(404).json({
        success: false,
        message: "No Vacancy Available",
      });
    }

    
    return res.status(200).json({
      success: true,
      message: "Vacancies retrieved successfully.",
      vacancy,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while Fetching Vacancy",
    });
  }
};
  

//Teacher

exports.registerTeacher = async (req, res) => {
  try {
    const { name, email, password, qualifications, experience } = req.body;

    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return res.status(400).json({
        success: false,
        message: "Teacher Already Exist",
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const teacher = await Teacher.create({
      name,
      email,
      password: hashedPassword,
      qualifications,
      experience,
    });

    return res.status(200).json({
      success: true,
      message: "Teacher Account Created Successfully",
      teacher,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while registering the Teacher",
    });
  }
};

exports.loginTeacher = async (req, res) => {
  try {
    const { email, password } = req.body;

    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "No Teacher with Email found plz Register first",
      });
    }

    const payload = {
      email: teacher.email,
      name: teacher.name,
      id: teacher._id,
      role: teacher.role,
    };

    if (await bcryptjs.compare(password, teacher.password)) {
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "4h",
      });

      teacher.token = token;
      teacher.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        teacher,
        message: "User Logged in Successfully",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while logging the teacher account",
    });
  }
};

exports.getAllVacancy = async (req, res) => {
  try {
    const allVacancy = await Vacancy.find();

    if (!allVacancy) {
      return res.status(404).json({
        success: false,
        message: "NO Vacancy",
      });
    }

    return res.status(200).json({
      success: true,
      message: "All Vacancy Fetched Successfully",
      allVacancy,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while logging the teacher account",
    });
  }
};

exports.applyVacancy = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const vacancyId = req.params.id;
    
  

    if (!teacherId || !vacancyId) {
      return res.status(401).json({
        success: false,
        message: "Id is Required to add Vacancy",
      });
    }

    const vacancy = await Vacancy.findById(vacancyId);
    if (!vacancy) {
      return res.status(404).json({
        success: false,
        message: "Vacacany not found",
      });
    }

    if(vacancy.applicants.includes(teacherId)){
        return res.status(400).json({
            success:false,
            message:"You have Already applied for the job"
          })
    }


    vacancy.applicants.push(teacherId);
    await vacancy.save()

    return res.status(200).json({
        success:true,
        message:"Applied Successfully",
        vacancy
      })
  

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while logging the teacher account",
    });
  }
};
