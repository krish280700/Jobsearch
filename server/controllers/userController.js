const userRepo = require('../lib/usersRepo.js');
const { validationResult } = require('express-validator');
const {hashPassword} = require("../utilities/utils.js")
const bcrypt = require("bcrypt")

exports.user_login = async function(req, res, next){
    const {email, password} = req.body
    const data = await userRepo.findBymail(email)
    if(data){
        const isPasswordCorrect = await bcrypt.compare(password, data.password);
        if(isPasswordCorrect){
            res.json({msg: "User verified", isValid: true})
        }else{
            res.json({msg: "Incorrect Password"})
        }
    }else{
        res.json({msg: "Email doesn't exist"})
    }
}

/* GET users listing. */
exports.users_list = async function(req, res, next) {
    const data = await userRepo.findAll();
    res.json({msg:"Success" ,users: data });
};


/* GET a user */
exports.user_detail = async function(req, res, next) {
    const user = await userRepo.findById(req.params.id);
    if (user) {
      res.json({user: user});
    } else {
      res.json({msg: 'Something Went Wrong'});
    }
};

/* GET user edit */
exports.user_edit_get = async function(req, res, next) {
    const user = await userRepo.findById(req.params.id);
    res.json({user: user} );
};

/* POST users delete */
exports.users_delete_post = async function(req, res, next) {
    await userRepo.deleteById(req.params.id);
    res.json({msg: "Successfully Deleted"});
};

/* POST user add */
exports.users_create_post = async function(req, res, next) {
    const result = validationResult(req.body);
    const {password} = req.body
    const user = {...req.body, password: await hashPassword(password)}

    if (!result.isEmpty()) {
        res.json({msg: result.array()});
    } else {
        await userRepo.create(user);
        res.json({msg: "User Successfully created"});
    }
};

// Post movie edit
exports.users_edit_post = async function(req, res, next) {
    const result = validationResult(req.body);
    if (!result.isEmpty()) {
        const user = await userRepo.findById(req.params.id);
        res.json({msg: result.array()});
    }else{
        await userRepo.update(req.body);
        res.json({msg: "Successfully Updated"});
    }   
};