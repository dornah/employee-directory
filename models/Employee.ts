import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: [true, 'Please provide a first name for this employee.'],
        maxlength: [50, 'First name cannot be more than 50 characters'],
    },
    lastName:{
        type: String,
        required: [true, 'Please provide a last name for this employee.'],
        maxlength: [50, 'Last name cannot be more than 50 characters'],
    },
    department:{
        type: String,
        maxlength: [50, 'Department cannot be more than 50 characters'],
    },
    title:{
        type: String,
        maxlength: [50, 'Title cannot be more than 50 characters'],
    },
}, {timestamps: true})

export default mongoose.models.Employee || mongoose.model("Employee", EmployeeSchema)