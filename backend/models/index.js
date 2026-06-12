/**
 * Models Index
 * Central export point for all MongoDB models
 */

const User = require("./User");
const Resume = require("./Resume");
const Roadmap = require("./Roadmap");

module.exports = {
  User,
  Resume,
  Roadmap,
};
