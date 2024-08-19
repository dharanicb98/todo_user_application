const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        let MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/users'
        await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('mongodb connected successfully');
    }
    catch (e) { 
      console.log('unable to connect to db', e);
      process.exit(1);
    }
}

module.exports = {connectDB}