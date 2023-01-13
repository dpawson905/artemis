const {
  getAllPlanets
} = require('../../models/planets.model');

exports.httpGetAllPlanets = (req, res, next) => {
  return res.status(200).json(getAllPlanets());
};
