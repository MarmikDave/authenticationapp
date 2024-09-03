// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const User = require("../models/user");

// const JWT_SECRET = process.env.JWT_SECRET || "jwt_secret";

// exports.signup = async (req, res) => {
//   const { username, email, password } = req.body;

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const userId = await User.create(username, email, hashedPassword);
//     const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });

//     res
//       .status(201)
//       .json({ message: "User created successfully", userId, token });
//   } catch (error) {
//     console.error("Error during signup:", error);
//     res.status(500).json({ message: "Error creating user" });
//   }
// };

// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findByEmail(email);

//     if (!user) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if (!isPasswordValid) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     res.json({ message: "Login successful", userId: user.id, token });
//   } catch (error) {
//     console.error("Error during login:", error);
//     res.status(500).json({ message: "Error during login" });
//   }
// };
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const JWT_SECRET = process.env.JWT_SECRET || "jwt_secret";

const userDataStore = new Map();

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await User.checkExists(username, email);
    if (userExists) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await User.create(username, email, hashedPassword);
    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });

    userDataStore.set(userId, null);

    res
      .status(201)
      .json({ message: "User created successfully", userId, token });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Error creating user" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Initialize user data in the store if it doesn't exist
    if (!userDataStore.has(user.id)) {
      userDataStore.set(user.id, null);
    }

    res.json({ message: "Login successful", userId: user.id, token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Error during login" });
  }
};

exports.storeUserData = async (req, res) => {
  const userId = req.user.userId;
  const dashboardData = req.body;

  try {
    userDataStore.set(userId, dashboardData);
    res.json({ message: "User data stored successfully" });
  } catch (error) {
    console.error("Error storing user data:", error);
    res.status(500).json({ message: "Error storing user data" });
  }
};

exports.getUserData = async (req, res) => {
  const userId = req.user.userId;

  try {
    const userData = userDataStore.get(userId);

    if (!userData) {
      return res.status(404).json({ message: "User data not found" });
    }

    res.json(userData);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Error fetching user data" });
  }
};

exports.logout = async (req, res) => {
  // In a real-world scenario, you might want to invalidate the token here
  // For now, we'll just send a success message
  res.json({ message: "Logout successful" });
};

exports.protected = async (req, res) => {
  // This is just a sample protected route
  res.json({ message: "This is a protected route", userId: req.user.userId });
};