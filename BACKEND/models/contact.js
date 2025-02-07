import mongoose, { Schema, models, model } from "mongoose";

const ContactSchema = new Schema({
    name: { type: String, required: true },
    lname: { type: String },
    email: { type: String, required: true },
    company: [{ type: String }],
    phone: { type: String, required: true },
    country: { type: String },
    price: { type: String },
    description: { type: String },
    project: [{ type: String }]
}, {
    timestamps: true
});

// Ensure the model is not re-registered
const Contact = models.Contact || model('Contact', ContactSchema);

export { Contact };  // ✅ Use named export
