"use strict";

class SpotController {
  constructor(log, spotService, httpStatus) {
    this.log = log;
    this.spotService = spotService;
    this.httpStatus = httpStatus;
  }

  async create(req, res) {
    try {
      const { body } = req;
      const result = await this.spotService.createSpot(body);

      res.send(result);
    } catch (err) {
      this.log.error(err.message);
      res.send(err);
    }
  }

  async get(req, res) {
    try {
      const { spotname } = req.params;
      const result = await this.spotService.getSpot(spotname);

      res.send(result);
    } catch (err) {
      this.log.error(err.message);
      res.send(err);
    }
  }
}

module.exports = SpotController;
