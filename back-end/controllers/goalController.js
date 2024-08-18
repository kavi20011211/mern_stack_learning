const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel');
const User = require('../models/userModel');

//@desc Get goals
//@route GET
//@access Private
const getGoals = asyncHandler(async(req,res) => {
    const goals = await Goal.find({user: req.user.id })
    if(goals == null){
        res.status(400).json({message:"No goals are found!"});
    }
    res.status(200).json(goals);
})

//@desc Set goals
//@route POST
//@access Private
const setGoals = asyncHandler(async(req,res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }
    const goal = await Goal.create({
        text:req.body.text,
        user:req.user.id
    })
    res.status(200).json(goal);
})

//@desc Update goals
//@route PUT
//@access Private
const updateGoals = asyncHandler(async(req,res) => {
    const goal = await Goal.findById(req.params.id);
    if(!goal){
        res.status(400) 
        throw new Error('Goal not found!');
    }

    //Check user exist
    const user = await User.findById(req.user.id);

    if(!user){
        res.status(401)
        throw new Error("User not found!");
    }

    //Make sure login user is macthed
    if(goal.user.toString()!== user.id){
        res.status(400)
        throw new Error("User not matched!");
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body,{
        new:true,
    })
    res.status(200).json(updatedGoal);
})

//@desc Delete goals
//@route DELETE
//@access Private
const deleteGoals = asyncHandler(async(req,res) => {
    const goal = await Goal.findById(req.params.id);
    if(!goal){
        res.status(400).json({message:"Goal not found!"});
    }

     //Check user exist
     const user = await User.findById(req.user.id);

     if(!user){
         res.status(401)
         throw new Error("User not found!");
     }
 
     //Make sure login user is macthed
     if(goal.user.toString()!== user.id){
         res.status(400)
         throw new Error("User not matched!");
     }

    await goal.deleteOne();
    res.status(200).json({id:req.params.id});
})

module.exports ={
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}