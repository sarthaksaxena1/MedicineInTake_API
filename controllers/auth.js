const { signAccessToken } = require("../helpers/jwtHelper");
const User = require("../models/user");

exports.register = async (req, res) => {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (emailRegex.test(req.body.email)) {
    await new User(req.body)
      .save()
      .then(() =>
        res.status(200).json({ message: "User is successfully registered." })
      )
      .catch((err) => {
        console.log(err);
        return res.status(400).json({ message: "Something went wrong" });
      });
  } else {
    return res.status(400).json({ message: "Email is not valid" });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await user.isValidPassword(req.body.password);
    if (isMatch) {
      const accessToken = signAccessToken(user._id);
      return res.status(200).json({ user, accessToken });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Something went wrong" });
  }
};
