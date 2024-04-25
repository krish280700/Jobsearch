const {UserModel} = require("../models/users")
const {dbConnect} = require("./db")
const mongoose = require('mongoose')

async function run() {
    dbConnect()
    return 'Connected to the MongoDB server...';
}

run().then(console.log).catch(console.error);

const userRepo = {
    findAll: async () => {
        const users = await UserModel.find({});       
        return users;
    },
    findById: async (uuid) => {
        const filter = {_id: new mongoose.Types.ObjectId(uuid)};
        const doc = await UserModel.findOne(filter);
        return doc
    },
    findBymail: async (mail) => {
        const filter = {email: mail};
        const doc = await UserModel.findOne(filter);
        return doc
    },
    create: async (user) => {
        const doc = {...user};
        const result = await UserModel.create(doc);
        console.log(`A document was inserted with the _id: ${result.insertedId}`); 
    },
    deleteById: async (uuid) => {
        const filter = {_id: new mongoose.Types.ObjectId(uuid)};
        const result = await UserModel.deleteOne(filter);
        if (result.deletedCount === 1) {
            console.log('Successfully delted one document');
        } else {
            console.log('No documents matched the query. Delted 0 documents');
        }
    },
    update: async (user) => {
        const filter = {_id: new mongoose.Types.ObjectId(user.id)};
        const updateDoc = {
            $set: {
                ...user
            }
        };
        const result = await UserModel.updateOne(filter, updateDoc);
        console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`);
    },

};

module.exports = userRepo;