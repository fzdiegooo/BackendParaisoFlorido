import { Router } from "express";
const router = Router()

router.get((req,res)=>{
    res.send("Get Alumnos")
})

export default router;