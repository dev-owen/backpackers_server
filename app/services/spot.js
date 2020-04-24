"use strict";

class SpotService {
  constructor(log, mongoose, httpStatus, errs) {
    this.log = log;
    this.mongoose = mongoose;
    this.httpStatus = httpStatus;
    this.errs = errs;
  }

  async createSpot(body) {
    const Spots = this.mongoose.model("Spots");
    const { spotname } = body;
    const spot = await Spots.findOne({ spotname });

    if (spot) {
      const err = new this.errs.InvalidArgumentError(
        "Spot with spotName already exists"
      );
      return err;
    }

    let newSpot = new Spots(body);
    newSpot.country = body.country;
    newSpot.city_region = body.city_region;
    newSpot.star_rate = body.star_rate;
    newSpot.description = body.description;
    newSpot = await newSpot.save();

    this.log.info("Spot Created Successfully");
    return newSpot;
  }

  async getSpot(spotname) {
    const Spots = this.mongoose.model("Spots");
    const spot = await Spots.findOne({ spotname });

    if (!spot) {
      const err = new this.errs.NotFoundError(
        `Spot with spotname - ${spotname} does not exists`
      );
      return err;
    }

    this.log.info("Spot fetched Successfully");
    return spot;
  }
}

module.exports = SpotService;
