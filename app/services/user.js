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

  async updateUser(body) {
    this.mongoose.set("useFindAndModify", false);
    const User = this.mongoose.model("Users");
    const { username } = body;
    const bodyJson = JSON.parse(body);
    User.findOneAndUpdate(
      { username },
      bodyJson,
      { new: true, upsert: true, remove: {}, fields: {} },
      (err, user) => {
        console.log(user);
        if (err) return err;
        return user;
      }
    );

    // const user = await Users.findOne({ username });
    // if (!user) {
    //   const err = new this.errs.InvalidArgumentError(
    //     "User with username does not exist"
    //   );
    //   return err;
    // }
    //
    // let updatedUser = new Users(body);
    // updatedUser.country = body.country;
    // updatedUser.email = body.email;
    // updatedUser.introduction = body.introduction;
    // updatedUser = await updatedUser.save();

    this.log.info("User Update Successfully");
    return User;
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
