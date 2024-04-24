const mongoose = require("mongoose")

const jobSchema = new mongoose.Schema(
    {
        skills: {
            type: Array,
        },
        description: {
            type: String,
        },
        position: {
            type: String
        },
        location: {
            type: String
        },
        salary: {
            type: String
        },
        user: {
            type: mongoose.Schema.Types.ObjectId, ref: 'User'
        } 
    },
    { timestamps: true }
);

const JobModel = mongoose.models.User || mongoose.model("Job", jobSchema);

 
module.exports =  { JobModel }