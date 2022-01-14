const mongoose = require("mongoose");
var findOrCreate = require('mongoose-findorcreate')

mongoose.connect("mongodb://127.0.0.1:27017/userDB", {useNewUrlParser: true});

const userSchema = new mongoose.Schema ({
  githubId: String,
  name: String,
  profile: String
});

userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

module.exports = User;