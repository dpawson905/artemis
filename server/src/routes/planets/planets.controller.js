const {
  getAllPlanets
} = require('../../models/planets.model');

exports.httpGetAllPlanets = async (req, res, next) => {
  return res.status(200).json(await getAllPlanets());
};
