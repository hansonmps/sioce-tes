const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const { registerValidation, loginValidation } = require("../validation");

// Register
router.post("/register", async (req, res) => {
  
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const isEmailExist = await User.findOne({ email: req.body.email });
  if (isEmailExist)
    return res.status(400).json({ error: "Email telah terdaftar" });

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    birthdate: req.body.birthdate,
    sex: req.body.sex,
    phone: req.body.phone,
    statusType: req.body.statusType,
    password,
  });

  try {
    const savedUser = await user.save();
    res.status = 200;
    res.setHeader('Content-type','application/json');
    res.json({ data: { userId: savedUser._id } });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Login
router.post("/login", async (req, res) => {
  
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ error: "Email atau password salah" });

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).json({ error: "Email atau password salah" });

// Create Javascript Web Token
const token = jwt.sign(
    // payload data
    {
      name: user.name,
      id: user._id,
    },
    process.env.TOKEN_SECRET, {expiresIn: '18000s'}
  );

  res.status = 200;
  res.setHeader('Content-type','application/json');
  res.header("Authorization", token).json({
    data: {
      id: user._id,
      nama: user.name,
      statusType: user.statusType,
      token,
    },
  });
});

module.exports = router;
