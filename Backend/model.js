const mongoose = require("mongoose");

// College Schema
const collegeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "College"
    }
}, { timestamps: true });

// Teacher Schema
const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    qualifications: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "Teacher"
    }
});

// Vacancy Schema
const vacancySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true,
        enum: ['Computer', 'ENTC', 'Civil', 'Mechanical', 'Electrical', 'Data Science']
    },
    description: {
        type: String,
        required: true
    },
    qualifications: {
        type: String,
        required: true
    },
    lastDate: {
        type: Date,
        required: true
    },
    college: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "College"
    },
    applicants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher"
    }]
});

// Export models
module.exports = {
    College: mongoose.model('College', collegeSchema),
    Teacher: mongoose.model('Teacher', teacherSchema),
    Vacancy: mongoose.model('Vacancy', vacancySchema)
};
