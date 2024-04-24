const {JobModel} = require("../models/jobs")
const {dbConnect} = require("./db")
const mongoose = require('mongoose')

async function run() {
    dbConnect()
    return 'Connected to the MongoDB server...';
}

run().then(console.log).catch(console.error);

const userRepo = {
    findAll: async () => {
        const users = await JobModel.find({});       
        return users;
    },
    findById: async (uuid) => {
        const filter = {_id: new mongoose.Types.ObjectId(uuid)};
        const doc = await JobModel.findOne(filter);
        return doc
    },
    create: async (movie) => {
        const doc = {...movie};
        const result = await JobModel.insertOne(doc);
        console.log(`A document was inserted with the _id: ${result.insertedId}`); 
    },
    deleteById: async (uuid) => {
        const filter = {_id: new mongoose.Types.ObjectId(uuid)};
        const result = await JobModel.deleteOne(filter);
        if (result.deletedCount === 1) {
            console.log('Successfully delted one document');
        } else {
            console.log('No documents matched the query. Delted 0 documents');
        }
    },
    update: async (movie) => {
        const filter = {_id: new mongoose.Types.ObjectId(movie.id)};
        const updateDoc = {
            $set: {
                ...movie
            }
        };
        const result = await JobModel.updateOne(filter, updateDoc);
        console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`);
    },

};

module.exports = userRepo;