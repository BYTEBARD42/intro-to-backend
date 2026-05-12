import { trusted } from "mongoose";
import { post} from "../models/post.model.js";

// create a post
const createPost = async(req,res)=>{
    try {
        const{name,description,age} = req.body;
        if(!name || !description || !age){
            return res.status(400).json({
                message:"All fields are required"
            });
        }

        const newPost = await post.create({name,description,age});
        res.status(201).json({message:"post created succesfully", post: newPost})
    } catch (error) {
        res.status(500).json({
            message:"internal server error"
        });
        
    }
}


const getPost = async(req,res)=>{
    try {
        const getPosts = await post.find();
        res.status(200).json(getPosts);
    } catch (error) {
            res.status(500).json({
            message:"internal server error"
        });
    }
}



const updatePost = async(req,res)=>{
    try {
        //basic validation for empty data

        if(Object.keys(req.body).length==0) return res.status(400).json({message:"No data provided for update"});
        const updatedpost = await post.findByIdAndUpdate(req.params.id,req.body,{new:true});

        if(!updatedpost) return res.status(404).json({message:"post not found"});

        res.status(200).json({message:"post updated"});
    } catch (error) {
        res.status(500).json({message:"Internal server error",error});
    }
};

const deletePost = async(req,res) =>{
    try {

        const deleted = await post.findByIdAndDelete(req.params.id);
        if(!deleted) return res.status(404).json({message:"post not found error",error});

        res.status(200).json({message:"post was deleted succesfully"})
    } catch (error) {
     res.status(500).json({message:"Internal server error",error});   
    }
};

export {
    createPost,
    getPost,
    updatePost,
    deletePost
};