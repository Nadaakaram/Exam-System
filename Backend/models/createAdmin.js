const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./User");

require("dotenv").config(); 

const mongoURI = "mongodb://localhost:27017/exam-system";

async function createAdmin() {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const email = "admin@gmail.com";
    const password = "admin123";
    const name = "Admin User";


    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      console.log("Admin already exists");
      mongoose.disconnect();
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const adminUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });

    await adminUser.save();
    console.log("Admin user created successfully");

    mongoose.disconnect();
  } catch (err) {
    console.error("Error creating admin:", err);
    
    mongoose.disconnect();
  }
}

createAdmin();
