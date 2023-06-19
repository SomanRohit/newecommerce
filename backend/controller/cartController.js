const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

var cartSchema = require('../model/cartModel');
var CartModel = mongoose.model('cart');


router.post('/addtocart', async function (req, res) {
  const orderStatus = "dispatch"

    var addOrder = new CartModel({
      orderStatus: orderStatus,
      user: req.body.user,
      address: req.body.address,
      orderItems : req.body.cart
  })
   
    await addOrder.save().then((result) => {
      return res.status(200).json({
          message: "Order added",
          data: result
      });
  }).catch((err) => {
    console.log(err)
      return res.status(400).json({
          message: "Bad Request"
      });
  })
})

router.get('/allorders', async function(req,res){
  await CartModel.find({}).then((result)=>{
      return res.status(200).json({
                    message: "orders",
                    data : result
                   });
      }).catch((err)=>{
          return res.status(400).json({
              message: "Bad Request"
             });
      })
})




module.exports = router;