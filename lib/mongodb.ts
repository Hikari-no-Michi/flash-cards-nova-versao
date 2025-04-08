const mongoose = require('mongoose');

const MONGODB_PWD = process.env.MONGODB_PWD;
const MONGODB_DB = process.env.MONGODB_DB;

const uri = `mongodb+srv://ryck-rifas:${MONGODB_PWD}@cluster0.maaff.mongodb.net/${MONGODB_DB}?appName=Cluster0`;

// Connect to the MongoDB database using Mongoose
async function connect() {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected successfully to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

// Disconnect from MongoDB
async function disconnect() {
  try {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (err) {
    console.error('Error disconnecting from MongoDB:', err);
  }
}

const database = {
  connect,
  disconnect
}

export default database