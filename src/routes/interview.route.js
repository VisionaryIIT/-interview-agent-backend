const express =require("express")
const interviewRouter=express.Router()
const authMiddware=require("../middlewares/auth.middleware")
const interviewController=require("../controllers/interview.controller")
const upload=require("../middlewares/file.middleware")

/**
 * @route POST/api/interview
 * @description generate new interview report on the basis of user self  description,resume pdf and job description
 * @access private
 */
interviewRouter.post("/",authMiddware.authUser,upload.single("resume"),interviewController.generateInterviewController)

module.exports=interviewRouter