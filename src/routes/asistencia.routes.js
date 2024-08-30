import { Router } from "express";
import { emailHelper } from "../utils/sendEmail.js";
const router = Router();

router.post("/asistencia",(req,res)=>{
    const { to, subject, text } = req.body;
    try {
        emailHelper(to,subject,text);
        
    } catch (error) {
        console.log(error);
        
    }

})

export default router