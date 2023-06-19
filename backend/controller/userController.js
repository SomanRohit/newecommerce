const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

var userSchema = require('../model/userModel');
var UserModel = mongoose.model('user');

router.post('/addUser', async function (req, res) {

    let hashPassword = await bcrypt.hash(req.body.password, 10);
    var addUser = new UserModel({
        username: req.body.username,
        password: hashPassword
    })

    await addUser.save().then((result) => {
        const jwtToken = jwt.sign({id : result._id},"testingKey")
        return res.status(200).json({
            message: "User added",
            data: result,
            token : jwtToken,
            success: true
        });
    }).catch((err) => {
        console.log(err)
        return res.status(400).json({
            message: "Bad Request"
        });
    })
})

router.post('/login', async function (req, res) {

    if (!req.body.username || !req.body.password) {
        return res.status(200).json({
            message: "Empty Credentials",
            success: false
        });
    }
    const user = await UserModel.findOne({ username: req.body.username })
    if (!user) {
        return res.status(200).json({
            message: "No User found",
            success: false
        });
    }
    const isPasswordMatched = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordMatched) {
        return res.status(200).json({
            message: "No User found",
            success: false
        });
    } else {
        const jwtToken = jwt.sign({id : user._id},"testingKey")
        return res.status(200).json({
            message: "Log In",
            data: user,
            token : jwtToken,
            success: true
        });
    }
})


module.exports = router;