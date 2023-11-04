import mongoose, {Document, Model, Schema} from "mongoose";


export interface IUser extends Document{
    username: string;
    password: string;
};

const userShema: Schema<IUser> = new mongoose.Schema({
    username:{
        type: String, 
        unique: true,
        required: [true, "Please enter your username"],
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minlength: [6, "Password must be at least 6 characters"],
        select: false,
    }
    
}, {timestamps: true})


const userModel: Model<IUser> = mongoose.model<IUser>("User", userShema);
export default userModel;