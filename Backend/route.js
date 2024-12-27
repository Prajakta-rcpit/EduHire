const express = require("express")
const router = express.Router();
const {registerCollege, loginCollege, addVacancy, logout, getVacancies, getVacancyById, registerTeacher, loginTeacher, getAllVacancy, applyVacancy} = require("./controller")
const {auth}  = require("./middleware")


router.post("/college/register",registerCollege)
router.post("/college/login",loginCollege)
router.get("/logout",logout)
router.post("/college/addVacancy",auth,addVacancy)
router.get("/college/getVacancy",auth,getVacancies)
router.get("/college/getVacancyById/:id",auth,getVacancyById)





router.post("/teacher/register",registerTeacher)
router.post("/teacher/login",loginTeacher)
router.get("/teacher/getAllVacancy",auth,getAllVacancy)
router.post("/teacher/applyVacancy/:id",auth,applyVacancy)


module.exports = router