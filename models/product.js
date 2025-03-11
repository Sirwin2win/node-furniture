const mongoose = require('mongoose');



const ProductSchema = mongoose.Schema(
    {
        title : {
            type : String,
            required : [true, "please enter product title"]
        },
        description : {
            type : String,
            required : [true, "please enter product description"]
        },
        quantity : {
            type : Number,
            required :true,
            default : 0
        },
        price : {
            type : Number,
            required : true,
            default : 0
        },
        images: [{ type: String }]
        },
        {
            timestamps : true
        }


);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;