import mongoose , { Schema } from "mongoose";
import { timeStamp } from "node:console";
import { type } from "node:os";

const postSchema = new Schema(

    {
        name:{
            type:String,
            required:true,
            trim:true
        }
        ,

        description:{
                type:String,
                required:true,
                trim:true,

        },
        

        age:{
            type:Number,
            required:true,
            min:1,
            max:150
        }

    },

    {
        timestamps:true
    }

)

export const post = mongoose.model('Post',postSchema);