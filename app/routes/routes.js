"use strict";

module.exports.register = (server, serviceLocator) => {
  server.post(
    {
      path: "/users",
      name: "Create User",
      version: "1.0.0",
      validation: {
        body: require("../validations/create_user"),
      },
    },
    (req, res, next) =>
      serviceLocator.get("userController").create(req, res, next)
  );

  server.get(
    {
      path: "/users/:username",
      name: "Get User",
      version: "1.0.0",
    },
    (req, res, next) => serviceLocator.get("userController").get(req, res, next)
  );

  server.get(
    {
      path: "/allusers",
      name: "Get All Users",
      version: "1.0.0",
    },
    (req, res, next) => serviceLocator.get("userController").getAllUsers(req, res, next)
  );

  server.put(
    {
      path: "/users/:username",
      name: "Update User",
      version: "1.0.0",
    },
    (req, res, next) =>
      serviceLocator.get("userController").update(req, res, next)
  );

  server.del(
    {
      path: "/users/:username",
      name: "Delete User",
      version: "1.0.0",
    },
    (req, res, next) =>
      serviceLocator.get("userController").delete(req, res, next)
  );

  server.post(
    {
      path: "/spots",
      name: "Create Spot",
      version: "1.0.0",
      vadlidation: {
        body: require("../validations/create_spot"),
      },
    },
    (req, res, next) =>
      serviceLocator.get("spotController").create(req, res, next)
  );

  server.get(
    {
      path: "/spots/:spotname",
      name: "Get Spot",
      version: "1.0.0",
    },
    (req, res, next) => serviceLocator.get("spotController").get(req, res, next)
  );
};
