const {Router}=require("express");
const CartModel=require("../models/Cart.model");




const cartRouter=Router();

cartRouter.get("/",async(req,res)=>{
    const data=await CartModel.find();
    res.send({msg:"Data sended",data:data});
});

cartRouter.post("/",async(req,res)=>{
    // const data=req.body;
    const {_id,img,name,discounted_price,price,pack,category,description}=req.body;
     
    const newData=new CartModel({
        _id,img,name,discounted_price,price,pack,category,description
    })
    await newData.save();
    
    res.send({msg:"Data Added to cart"});
});
cartRouter.delete("/:_id",async(req,res)=>{
    const {_id}=req.params

    try {
        await CartModel.findByIdAndDelete(_id);
        res.send({msg:`Deleted item : ${_id}`});
        
    } catch (error) {
        res.send({msg:`Error while Deleting item : ${_id}`});
    }
   
    
    
    
});

module.exports={cartRouter};