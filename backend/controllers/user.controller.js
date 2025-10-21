import uploadOnCloudinary from "../config/cloudinary.js"
import User from "../models/user.model.js"

export const getCurrentUser=async (req,res)=>{
try {
    let user=await User.findById(req.userId).select("-password")
    if(!user){
        return res.status(400).json({message:"user not found"})
    }

    return res.status(200).json(user)
} catch (error) {
    return res.status(500).json({message:`current user error ${error}`})
}
}

export const editProfile=async (req,res)=>{
    try {
        let {name}=req.body
        let image;
        if(req.file){
            image=await uploadOnCloudinary(req.file.path)
        }
        let user=await User.findByIdAndUpdate(req.userId,{
           name,
           image 
        },{new:true}) //{new:true} to get new data instantly

        if(!user){
            return res.status(400).json({message:"user not found"})
        }

        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({message:`profile error ${error}`})
    }
}

export const getOtherUsers=async (req,res)=>{//p3
    try {
        let users=await User.find({
            _id:{$ne:req.userId} //$ne means not equal to
        }).select("-password")
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({message:`get other users error ${error}`})
    }
}


export const search =async (req,res)=>{ //p7
    try {
        let {query}=req.query
        if(!query){
            return res.status(400).json({message:"query is required"})
        }
        let users=await User.find({
            $or:[
    {name:{$regex:query,$options:"i"}},//capittal or small letter
    {userName:{$regex:query,$options:"i"}},//capittal or small letter
            ]
        })
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({message:`search users error ${error}`})
    }
}