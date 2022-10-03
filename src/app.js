const express = require("express");
const path = require("path");
const app = express();
// require("./db/conn");
const Register = require("./models/registers")

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");

app.use(express.json());
app.use(express.urlencoded({extended:false}))


app.use(express.static(static_path))

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
           
        }else{
           res.status(201).render("index");
        } 
        else {

            res.send("password are not matching")
        }
        
    } catch (error) {
        res.status(400).send(error)
    }
});

// app.get("/", (req, res) =>{
//     res.send("Hello, Sahil here !")
// });

app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
})

