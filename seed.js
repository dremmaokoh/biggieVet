const User = require('./models/models.user');
const mongoose = require('mongoose');

const connectDB = async (req, res) => {
  try {
    await mongoose.connect("mongodb+srv://biggievet:oladara@cluster0.h0wjkeu.mongodb.net/?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to mongodb');
  } catch (error) {
    console.log(error);
  }
};

connectDB();
const data = {
    name: 'Emmanuel Okoh',
    email: 'emmanuelokoh@gmail.com',
    password: 'emmanuelokoh',
    phoneNumber: '08162291341',
    role: "admin"
  };


  const seedDatabase = async () => {
    try {
     // await User.deleteMany({});
      await User.insertMany(data);
      console.log('Seeding successful');
    } catch (error) {
      console.log(error);
    }
  };
  
  seedDatabase().then(() => {
    mongoose.connection.close();
  });