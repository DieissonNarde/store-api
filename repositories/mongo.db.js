import mongodb from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config();

function getClient() {
  const uri = process.env.MONGODB_URL;
  return new mongodb.MongoClient(uri);
}

export { getClient };
