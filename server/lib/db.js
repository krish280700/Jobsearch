const mongoose = require('mongoose');
const connectionString = process.env.MONGODB_URL;

const dbConnect = async () => {
    try{
        await mongoose.connect(connectionString)
            .then(() => console.log('Connected to MongoDB'))
            .catch(error => console.error('Error connecting to MongoDB:', error));
    }catch(err){
        console.log(err)
    }
}

module.exports = {dbConnect}