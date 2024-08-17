const asyncHandler = require('express-async-handler');

//@desc Get goals
//@route GET
//@access Private
const getGoals = asyncHandler(async(req,res) => {
    res.status(200).json({message:"Get goals"});
})

//@desc Set goals
//@route POST
//@access Private
const setGoals = asyncHandler(async(req,res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }
    res.status(200).json({message:"Get goals"});
})

//@desc Update goals
//@route PUT
//@access Private
const updateGoals = asyncHandler(async(req,res) => {
    res.status(200).json({message:"Get goals"});
})

//@desc Delete goals
//@route DELETE
//@access Private
const deleteGoals = asyncHandler(async(req,res) => {
    res.status(200).json({message:"Get goals"});
})

module.exports ={
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}