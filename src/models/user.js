import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userid: {type: Number, required: true },
    username: {type: String, required: true},
    useremail: {type: String, required: true},
    userage: {type: Number, required: true},
    usergender: {type: String, required: true},
    userphone: {type: String, required: true},
    usercpf: {type: String, required: true},
    userrg: {type: String, required: true}
})

export default mongoose.models.User || mongoose.model('User', UserSchema)
