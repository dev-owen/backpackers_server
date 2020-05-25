"use strict";

class UserService {
  constructor(log, mongoose, httpStatus, errs) {
    this.log = log;
    this.mongoose = mongoose;
    this.httpStatus = httpStatus;
    this.errs = errs;
  }

  async createUser(body) {
    const User = this.mongoose.model("Users");
    const { username } = body;
    const user = await User.findOne({ username });

    if (user) {
      const err = new this.errs.InvalidArgumentError(
        "User with username already exists"
      );
      return err;
    }

    let newUser = new User(body);
    newUser.password = body.password;
    newUser.email = body.email;
    newUser.country = body.country;
    newUser.introduction = body.introduction;
    newUser = await newUser.save();

    this.log.info("User Created Successfully");
    return newUser;
  }

  async getUser(username) {
    const User = this.mongoose.model("Users");
    const user = await User.findOne({ username });

    if (!user) {
      const err = new this.errs.NotFoundError(
        `User with username - ${username} does not exists`
      );
      return err;
    }

    this.log.info("User fetched Successfully");
    return user;
  }

  async getAllUsers() {
    const User = this.mongoose.model("Users");
    const allUsers = await User.find();
    if (!allUsers) {
      const err = this.errs.message("there are no user in db");
      return err;
    }
    return allUsers;
  }

  async updateUser(body) {
    this.mongoose.set("useFindAndModify", false);
    const User = this.mongoose.model("Users");
    const bodyJson = JSON.parse(body);
    const { username, email, country, introduction } = bodyJson;
    console.log(email);
    console.log(country);
    User.findOneAndUpdate(
      { username: username },
      {
        $set: {
          email: email,
          country: country,
          introduction: introduction
        }
      },
      {
        new: false,
        upsert: false,
        returnNewDocument: true
      },
      (err) => {
        if (err) return err;
      }
    );
    this.log.info("User Update Successfully");
    return bodyJson;
  }

  async deleteUser(username) {
    this.mongoose.set("useFindAndModify", false);
    const User = this.mongoose.model("Users");
    User.findOneAndDelete({ username }, (err) => {
      if (err) return err;
    });
    this.log.info("User deleted Successfully");
    return User;
  }
}

module.exports = UserService;
