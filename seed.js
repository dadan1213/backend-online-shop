require("dotenv").config();

console.log("Mongo URI:", process.env.MONGO_URI);

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    await User.deleteMany();

    const users = [
      {
        name: "Admin",
        email: "admin@mail.com",
        password: "123456",
      },
      {
        name: "dadan",
        email: "dandidkas@gmail.com",
        password: "123456",
      },
      {
        name: "Ali",
        email: "ali@mail.com",
        password: "123456",
      },
      {
        name: "Budi",
        email: "budi@mail.com",
        password: "123456",
      },
    ];

    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);

      await User.create({
        name: user.name,
        email: user.email,
        password: hashedPassword,
      });
    }

    console.log("Akun dummy berhasil dibuat");
    process.exit();
  } catch (error) {
    console.error("Gagal membuat akun dummy:", error.message);
    process.exit(1);
  }
};

seedUsers();
