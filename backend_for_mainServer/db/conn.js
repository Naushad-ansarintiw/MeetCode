require('dotenv').config();
const mongoose = require('mongoose');

const DB = process.env.DATABASE;
mongoose.set('strictQuery',false);

mongoose.connect(DB).then(()=>{
    console.log('Database Connected');
}).catch((err)=>{
    console.log(err);
});

