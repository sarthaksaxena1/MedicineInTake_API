const JWT = require("jsonwebtoken"); // using jwt for auth purpose

/* Function To Sign Access Token Started */
exports.signAccessToken = (userId) => {

  const payload = {}; // creating payload
  const jwtSecret = process.env.ACCESS_TOKEN_SECRET;
  const option = {
    expiresIn: "60m",
    issuer: "sarthak",
    audience: `${userId}`,
  };
  try {
    var AccessTokenGenerated = JWT.sign(payload, jwtSecret, option);
    return AccessTokenGenerated;
  } catch (err) {
    console.log("Error Occured Signing Access Token ", err);
  }
};

