const { Schema, models, model } = require('mongoose');

const ExperienceSchema = new Schema({
    title: { type: String },
    slug: { type: String, required: true },
    images: [{ type: String }],
    description: { type: String },
    experiencecategory: [{ type: String }],
    tags: [{ type: String }],
    status: { type: String },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
}, {
    timestamps: true,
});

export const Experience = models.Experience || model('Experience', ExperienceSchema);

export default Experience;