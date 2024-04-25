const mongoose = require("mongoose")

const jobSchema = new mongoose.Schema(
    {
        skills: {
            type: String,
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
        organization: {
            type: String
        },
        email: {
            type: String
        },
        jobtype: {
            type: String
        },
        userId: {
            type: String
        }
    },
    { timestamps: true }
);

const JobModel = mongoose.models.Job || mongoose.model("Job", jobSchema);

 
module.exports =  { JobModel }