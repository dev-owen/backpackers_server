"use strict";

class UserController {
  constructor(log, userService, httpStatus) {
    this.log = log;
    this.userService = userService;
    this.httpStatus = httpStatus;
  }

  async create(req, res) {
    try {
      const { body } = req;
      const result = await this.userService.createUser(body);

      res.send(result);
    } catch (err) {
      this.log.error(err.message);
      res.send(err);
    }
  }

  async get(req, res) {
    try {
      const { username } = req.params;
      const result = await this.userService.getUser(username);

      res.send(result);
    } catch (err) {
      this.log.error(err.message);
      res.send(err);
    }
  }

  async getAllUsers(req, res) {
    try {
      const result = await this.userService.getAllUsers();
      res.send(result);
    } catch (err) {
      this.log.error(err.message);
      res.send(err);
    }
  }

  async update(req, res) {
    try {
      const { body } = req;
      const result = await this.userService.updateUser(body);

      res.send(result);
    } catch (err) {
      this.log.error(err.message);
      res.send(err);
    }
  }

  async delete(req, res) {
    try {
      const { username } = req.params;
      const result = await this.userService.deleteUser(username);

      res.send(result);
    } catch (err) {
      this.log.error(err.message);
      res.send(err);
    }
  }
}

module.exports = UserController;
