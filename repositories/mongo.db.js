import mongodb from 'mongodb';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGODB_URL;

function getClient() {
  return new mongodb.MongoClient(uri);
}

async function connect() {
  return await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export { getClient, connect };
