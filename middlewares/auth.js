const createHttpError = require("http-errors"); // create error library
const JWT = require("jsonwebtoken"); // using jwt for auth purpose
const User = require("../models/user");

exports.verifyAccessToken = async(req, res, next) => {
  if (!req.headers["authorization"])
    return next(createHttpError.Unauthorized());
  const authHeader = req.headers["authorization"];
  const bearerToken = authHeader.split(" ");
  const token = bearerToken[1];
  JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, async(err, payload) => {
    //create type of error
    if (err) {
      if (err.name === "JsonWebTokenError") {
        return next(createHttpError.Unauthorized());
      } else {
        return next(createHttpError.Unauthorized(err.message));
      }
    }
    req.payload = payload;
    if (req.payload.aud) {
      req.user = await User.findById({ _id: req.payload.aud });
      next();
    }
  });
};
