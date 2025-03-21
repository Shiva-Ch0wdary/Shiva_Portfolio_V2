const { Schema, models, model } = require('mongoose');

const ServiceSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
}, {
    timestamps: true,
});

export const Service = models.Service || model('Service', ServiceSchema );

export default Service;