import mongoose from 'mongoose';

async function connect(){
    const dbUri:string = `${process.env.MONGODB_URI}`
    try {
        await mongoose.connect(dbUri);
        console.log("connected to database");
    } catch (error) {
        console.log(`could not connect ${error}`);
        process.exit(1)
    }
}

export default connect