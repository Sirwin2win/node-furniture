const express = require("express");
 router = express.Router();
 const verifyToken = require('../middlewares/authJWT');

 const  {
    signup,
    signin
    } = require("../controllers/usersController.js");



    router.post("/register", signup,  (req, res) =>{
    });
    router.post("/login", signin, (req, res) => {
    });

    router.get("/hiddencontent", verifyToken, (req, res) => {
        if (!user) {
         res.status(403)
         .send({
         message: "Invalid JWT token"
         });
         }
        if (req.user == "admin") {
         res.status(200)
         .send({
         message: "Congratulations! but there is no hidden content"
         });
         } else {
         res.status(403)
         .send({
         message: "Unauthorised access"
         });
         }
        });
    module.exports = router;
   