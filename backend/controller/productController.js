const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const path = require('path')
const multer = require('multer')
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./images/')
    },
    filename : (req, file, cb)=>{
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({storage : storage})
var productSchema = require('../model/productModel');
var ProductModel = mongoose.model('product');

router.post('/addProduct', upload.single('image'),async function(req,res){
    var addProduct = new ProductModel({
        name : req.body.name,
        image : 'http://localhost:8000/' + req.file.filename,
        price : req.body.price,
        description : req.body.description
    })
    
       await addProduct.save().then((result)=>{
        return res.status(200).json({
                      message: "Product added",
                      data : result
                     });
        }).catch((err)=>{
            return res.status(400).json({
                message: "Bad Request"
               });
        })
})


router.get('/allproducts', async function(req,res){
    await ProductModel.find({}).then((result)=>{
        return res.status(200).json({
                      message: "Product added",
                      data : result
                     });
        }).catch((err)=>{
            return res.status(400).json({
                message: "Bad Request"
               });
        })
})



module.exports = router;