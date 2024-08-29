import { Router } from "express";
const router = Router()

router.get("/alumnos",(req,res)=>{
    res.send("Get Alumnos")
})

export default router;