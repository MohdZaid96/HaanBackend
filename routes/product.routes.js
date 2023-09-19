const {Router}=require("express");
const ProductModel=require("../models/Product.model");


const productRouter=Router();

productRouter.get("/:_id",async(req,res)=>{  
    const {_id}=req.params  
    try {
      const data = await ProductModel.find({_id})    
  
      res.send({data});
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
});

productRouter.get("/",async(req,res)=>{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
  
    try {
      const data = await ProductModel.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
  
      const totalBlogs = await ProductModel.countDocuments();
  
      res.send({
        data
      });
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
});



productRouter.get("/sort",async(req,res)=>{
    const sortField = req.query.sort || 'createdAt'; // Default to sorting by createdAt
    const sortOrder = req.query.order || 'asc'; // Default to descending order
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    console.log(sortField);
    console.log(sortOrder);
    console.log(page);
    console.log(limit)
  
    try {
      const data = await ProductModel.find().sort({ [sortField]: sortOrder }).skip((page - 1) * limit)
      .limit(limit).exec();
  
      res.send({ data });
    } catch (err) {
      res.status(500).send({ error: 'Internal server error' });
    }
  });

  productRouter.get("/search",async(req,res)=>{
    const query = req.query.q;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
  
    try {
      const product = await ProductModel.find({
        $or: [{ title: { $regex: query, $options: 'i' } }, { content: { $regex: query, $options: 'i' } }],
      }).skip((page - 1) * limit)
      .limit(limit).exec();
  
      res.send({ product });
    } catch (err) {
      res.status(500).send({ error: 'Internal server error' });
    }
  });
  productRouter.get("/filter",async(req,res)=>{
    const category = req.query.category;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
  
    try {
      const product = await ProductModel.find({category:category}).skip((page - 1) * limit)
      .limit(limit).exec();
  
      res.send({ product });
    } catch (err) {
      res.status(500).send({ error: 'Internal server error' });
    }
  });
module.exports={productRouter};