const mongoose = require('mongoose'); 
const mongoURI = process.env.MONGO_URL;


mongoose.connect(mongoURI).then(()=>{
    console.log('MongoDB connected');
}).catch((err)=>{
    console.log('MongoDB connection error: ', err);
}) 


