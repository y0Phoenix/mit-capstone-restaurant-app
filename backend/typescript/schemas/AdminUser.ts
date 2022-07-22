import mongoose from "mongoose";

const AdminUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    avatar: {
        type: String
    },
    token: {
        type: String,
        required: true
    }
});

const Admin = mongoose.model('AdminUser', AdminUserSchema);

export default Admin;