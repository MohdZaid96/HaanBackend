const mongoose=require("mongoose");

const ProductSchema=mongoose.Schema({
    img : {type :String , required : true},
    name:{type :String ,required:true},
    discounted_price:{type :String ,required:true},
    price : {type :String , required : true},
    pack:{type :String ,required:true},
    category:{type :String ,required:true},
    description:{type :String ,required:true}
})

const ProductModel=mongoose.model('product',ProductSchema);

module.exports=ProductModel;

