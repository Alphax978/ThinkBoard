import mongoose from 'mongoose'


export const mongoDBConnection = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connection successful")
    }
    catch(error){
        console.log("error connecting to database", error)
        process.exit(1)
    }
}