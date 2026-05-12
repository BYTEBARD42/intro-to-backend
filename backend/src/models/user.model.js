import mongoose ,{Schema}  from "mongoose";
import { timeStamp } from "node:console";
import bcrypt from "bcrypt";
const userSchema = new Schema(
    {
    username:{
        type: String,
        required: true,
        unique:true,
        lowercase: true,
        trim: true,
        minLength:1,
        maxLength:30
    },

    password:{
        type: String,
        required: true,
        trim: true,
        minLength:6,
        maxLength:30
    },

    email:{
        type:String,
        required: true,
        unique:true,
        lowercase: true,
        trim: true,
        minLength:1,
        maxLength:30
    }
    },

    {timestamps:true}
)

// before saving password we need to hash it
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

//compare password

userSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password);
}

export const User = mongoose.model("User",userSchema);