import mongoose from 'mongoose'

let isConnected = false

export const connectToDB = async () =>{
    mongoose.set('strictQuery',true); // for safe connection
    if(!process.env.MONGODB_URL){ return console.log('MongoDB url is not founded')}
    if(isConnected){ return console.log('Already connected to MongoDB')}
    
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('Connected to MongoDB')
    }catch (e) {
        console.log(e)
    }


}