import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import Postroute from './routes/PostRoute.js';
import DalleRoute from './routes/DalleRoute.js';

dotenv.config();

const app = express();

// Your remaining code here



const{ PORT,MONGODB_URL}= process.env


app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use(express.urlencoded({extended:true}))


mongoose.connect(MONGODB_URL,{useNewUrlParser:true})
.then(()=>(console.log('Connected to Mongodb database')))
.catch((err)=>(console.log(err)))





const hello= async (req, res) =>{
    res.send ("hello from dall-e and wasfa")
}

app.use('/api/post',Postroute)
app.use('/api/dalle',DalleRoute)

Postroute.get('/',hello)


app.listen(PORT,function(){
    console.log(`Server is running on port ${PORT}`);
})