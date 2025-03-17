const express = require('express');
const router = express.Router();
const fs = require('fs')
const {
    getProducts,
    getProduct,
    createProduct,
    updatedProduct,
    deleteProduct
}= require('../controllers/productController.js');
const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })

const storage = multer.diskStorage({
    destination:function(req,file,callback){
        const dir='../uploads';
        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        callback(null,dir);
    },
    filename:function(req,file,callback){
        callback(null,file.originalname);
    }
});
const upload = multer({ storage: storage }).array('images', 5)


router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/',upload, createProduct);
router.put('/:id', updatedProduct);
router.delete('/:id', deleteProduct);




module.exports = router;