const { Schema, models, model } = require('mongoose');

const EducationSchema = new Schema(
  {
    // This field indicates which column to render the entry in
    section: { type: String, required: true }, // "education" or "education2"
    period: { type: String, required: true },  // e.g. "2020-2024"
    institution: { type: String, required: true }, // e.g. "IIIT Sri City"
    degree: { type: String, required: true },  // e.g. "B.Tech in Computer Science"
  },
  {
    timestamps: true,
  }
);

export default models.Education || model('Education', EducationSchema);
