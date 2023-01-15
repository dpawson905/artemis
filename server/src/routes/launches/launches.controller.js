const {
  getAllLaunches,
  existsLaunchWithId,
  abortLaunchById,
  scheduleNewLaunch
} = require("../../models/launches.model");

exports.httpGetAllLaunches = async (req, res, next) => {
  return res.status(200).json(await getAllLaunches());
};

exports.httpAddNewLaunch = async (req, res, next) => {
  const launch = req.body;
  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({
      error: "Missing required launch properties",
    });
  }
  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Invalid launch date",
    });
  }
  await scheduleNewLaunch(launch);
  return res.status(201).json(launch);
};

exports.httpAbortLaunch = async (req, res, next) => {
  const launchId = Number(req.params.id);
  const existsLaunch = await existsLaunchWithId(launchId)
  if (!existsLaunch) {
    return res.status(404).json({
      error: "Launch not found",
    });
  }

  const aborted = await abortLaunchById(launchId);
  if (!aborted) return res.status(400).json({ error: 'Launch not aborted' })
  return res.status(200).json({ ok: true });
};
