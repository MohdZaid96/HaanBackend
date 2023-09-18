const express=require("express");
const connection=require("./config/db")
const UserModel=require("./models/User.model");
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {productRouter}=require("./routes/product.routes");
const { cartRouter } = require("./routes/cart.routes");
require("dotenv").config();
const cors=require("cors");

const app=express();

app.use(cors({
    origin: "*",
  }));
app.use(express.json());

// app.use("/products", productRouter);




// app.get("/", (req, res) => {
//     res.send({ msg: "this is base API url" });
//   });

app.get("/",(req,res)=>{
    res.send("Base  URL");
})
app.post("/signup",(req,res)=>{
    const {name,email,password}=req.body;

    bcrypt.hash(password, 3, async function(err, hash) {
        if(err){
             res.send({msg : "Error While hasing"})
        }else{
            const users=new UserModel({
                name,
                email,
                password : hash
            })
             await users.save();
             res.send({msg : "Signup succesful"});
        }
    });
})

app.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try {
        console.log("Request received:", email, password);
            

        const user= await UserModel.findOne({email : email});
        console.log("User found:", user);

    if(user){
        const userPass=user.password;
        await bcrypt.compare(password, userPass, function(err, result) {
            if(err){
                console.error("Error comparing passwords:", err);

                res.send({msg : "Wrong password"});
            }
            else{
                const token = jwt.sign({userId:user._id}, process.env.SECRET_KEY);
                console.log("Token successful");

                res.send({msg:"Login Successful",token:token,data:user});
            }
        });

    }else{
        res.send({msg:"Signup first"});
    }
        
    } catch (error) {
        res.send({msg:"ERROR occured while Login"});
    }
    
})

app.use("/product", productRouter);
app.use("/cart", cartRouter);



app.listen(process.env.PORT,async(req,res)=>{
    try {
        await connection;
        console.log(`listening ${process.env.PORT}`);
    } catch (error) {
        console.log(error);
    }
    
})
