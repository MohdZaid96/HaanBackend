const {Router}=require("express");
const ProductModel=require("../models/Product.model");


const productRouter=Router();

productRouter.get("/",async(req,res)=>{
    const data=await ProductModel.find();
    res.send({msg:"Data sended",data:data});
});

module.exports={productRouter};