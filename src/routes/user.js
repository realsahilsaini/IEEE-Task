const express = require('express');
// const router = express.Router();

app.get("/", (req, res) =>{
  res.render("index")
});

app.get("/register", (req, res) =>{
    res.render("register")
});

app.post("/register", async (req, res) =>{
    try {
        const email = req.body.email
        Register.findOne({email}).exec((err, obj) => {
            if (obj){
                return res.status(400).send("Email already exists");
            }
        })

        const password = req.body.password;
        const cpassword = req.body.confirmpassword;
        if(password === cpassword){
            const registerParticipant = new Register({
                firstname :req.body.firstname, 
                lastname :req.body.lastname, 
                email:req.body.email, 
                phone:req.body.phone, 
                password:password,
                confirmpassword:cpassword, 
                gender:req.body.gender
            })  
            
           const registered = await registerParticipant.save();

           if(registered) res.status(200).redirect("/");
           
        }
        else {
            res.send("password are not matching")
        }
    } catch (error) {
        res.status(400).send(error)
    }
});