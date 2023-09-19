const mongoose=require("mongoose");

const CartSchema=mongoose.Schema({
    img : {type :String , required : true},
    name:{type :String ,required:true},
    discounted_price:{type :Number ,required:true},
    price : {type :Number , required : true},
    pack:{type :Number ,required:true},
    category:{type :String ,required:true},
    description:{type :String ,required:true},
    quantity:{type :Number},
    user_email:{type:String,required:true}
})

const CartModel=mongoose.model('cart',CartSchema);

module.exports=CartModel;

