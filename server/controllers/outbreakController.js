const Outbreak = require("../models/Outbreak");

exports.getAll = async (req, res) => {
  try {
    const { disease, region, severity, from, to } = req.query;
    const filter = {};
    if (disease) filter.disease_name = disease;
    if (region) filter.region = region;
    if (severity) filter.severity = severity;
    if (from || to) {
      filter.date_reported = {};
      if (from) filter.date_reported.$gte = new Date(from);
      if (to) filter.date_reported.$lte = new Date(to);
    }

    const outbreaks = await Outbreak.find(filter).sort({ date_reported: -1 });
    res.json(outbreaks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const outbreak = await Outbreak.findById(req.params.id);
    if (!outbreak) return res.status(404).json({ message: "Not found" });
    res.json(outbreak);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const outbreak = await Outbreak.create({
      ...req.body,
      reported_by: req.user?._id || null,
    });

    // Emit real-time event
    const io = req.app.get("io");
    if (io) io.emit("outbreak:new", outbreak);

    res.status(201).json(outbreak);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const outbreak = await Outbreak.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!outbreak) return res.status(404).json({ message: "Not found" });

    const io = req.app.get("io");
    if (io) io.emit("outbreak:updated", outbreak);

    res.json(outbreak);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const outbreak = await Outbreak.findByIdAndDelete(req.params.id);
    if (!outbreak) return res.status(404).json({ message: "Not found" });

    const io = req.app.get("io");
    if (io) io.emit("outbreak:deleted", req.params.id);

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const [byRegion, bySeverity, byDisease, totals] = await Promise.all([
      Outbreak.aggregate([
        {
          $group: {
            _id: "$region",
            totalCases: { $sum: "$cases_count" },
            totalDeaths: { $sum: "$deaths_count" },
            count: { $sum: 1 },
          },
        },
        { $sort: { totalCases: -1 } },
      ]),
      Outbreak.aggregate([
        { $group: { _id: "$severity", count: { $sum: 1 } } },
      ]),
      Outbreak.aggregate([
        {
          $group: {
            _id: "$disease_name",
            totalCases: { $sum: "$cases_count" },
            totalDeaths: { $sum: "$deaths_count" },
          },
        },
        { $sort: { totalCases: -1 } },
        { $limit: 10 },
      ]),
      Outbreak.aggregate([
        {
          $group: {
            _id: null,
            totalCases: { $sum: "$cases_count" },
            totalDeaths: { $sum: "$deaths_count" },
            totalRecovered: { $sum: "$recovered_count" },
            totalOutbreaks: { $sum: 1 },
            regions: { $addToSet: "$region" },
          },
        },
      ]),
    ]);

    res.json({
      byRegion,
      bySeverity,
      byDisease,
      totals: totals[0] || {},
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTrends = async (req, res) => {
  try {
    const trends = await Outbreak.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$date_reported" },
          },
          cases: { $sum: "$cases_count" },
          deaths: { $sum: "$deaths_count" },
        },
      },
      { $sort: { _id: 1 } },
      { $limit: 30 },
    ]);
    res.json(trends.map((t) => ({ date: t._id, cases: t.cases, deaths: t.deaths })));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
