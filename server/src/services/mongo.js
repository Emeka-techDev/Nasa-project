import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URL;

//const MONGO_URL='mongodb+srv://Emeka-NasaApi:UVsCJMe94jaXJ9w0@nasacluster.cwgnvkj.mongodb.net/Nasa?retryWrites=true&w=majority'

console.log(`mongo url is ${MONGO_URI}`);

mongoose.connection.on('open', () => {
    console.log('connected  to  mongoDB atlas ')
}) 

mongoose.connection.on('error', (err) => {
    console.log(`failed connected  to  mongoDB atlas ${err}`);
}) 

export const mongoConnect = async () => {
    await mongoose.connect(MONGO_URI)

}

export const mongoDisconnect = async () => {
    await mongoose.disconnect()
}
