const mongoose = require("mongoose");

const outbreakSchema = new mongoose.Schema(
  {
    disease_name: { type: String, required: true, trim: true, maxlength: 100 },
    region: { type: String, required: true, trim: true, maxlength: 100 },
    country: { type: String, required: true, trim: true, maxlength: 100 },
    latitude: { type: Number, required: true, min: -90, max: 90 },
    longitude: { type: Number, required: true, min: -180, max: 180 },
    cases_count: { type: Number, required: true, default: 0, min: 0 },
    deaths_count: { type: Number, default: 0, min: 0 },
    recovered_count: { type: Number, default: 0, min: 0 },
    severity: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "low",
    },
    description: { type: String, maxlength: 2000 },
    date_reported: { type: Date, default: Date.now },
    is_verified: { type: Boolean, default: false },
    reported_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

outbreakSchema.index({ disease_name: 1 });
outbreakSchema.index({ region: 1 });
outbreakSchema.index({ date_reported: -1 });
outbreakSchema.index({ severity: 1 });

module.exports = mongoose.model("Outbreak", outbreakSchema);
