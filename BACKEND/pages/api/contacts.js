import { mongooseConnect } from "@/lib/mongoose";
import { Contact } from "@/models/contact"; // ✅ Named import

export default async function handle(req, res) {
    await mongooseConnect();  // Ensure DB connection

    const { method } = req;

    if (method === 'POST') {
        try {
            const { name, lname, email, description, company, phone, country, price, project } = req.body;

            // Debugging: Ensure Contact model is defined
            console.log("Contact Model:", Contact);

            const contactDoc = await Contact.create({
                name, lname, email, description, company, phone, country, price, project
            });

            res.status(201).json(contactDoc);
        } catch (error) {
            console.error("Error creating contact:", error);
            res.status(500).json({ error: "Failed to create contact" });
        }
    }

    if (method === "GET") {
        try {
            if (req.query?.id) {
                const contact = await Contact.findById(req.query.id);
                res.json(contact);
            } else {
                const contacts = await Contact.find();
                res.json(contacts.reverse());
            }
        } catch (error) {
            console.error("Error fetching contacts:", error);
            res.status(500).json({ error: "Failed to fetch contacts" });
        }
    }

    if (method === "PUT") {
        try {
            const { _id, name, lname, email, description, company, phone, country, price, project } = req.body;

            await Contact.updateOne({ _id }, {
                name, lname, email, description, company, phone, country, price, project
            });

            res.json({ success: true });
        } catch (error) {
            console.error("Error updating contact:", error);
            res.status(500).json({ error: "Failed to update contact" });
        }
    }

    if (method === "DELETE") {
        try {
            if (req.query?.id) {
                await Contact.deleteOne({ _id: req.query.id });
                res.json({ success: true });
            } else {
                res.status(400).json({ error: "No ID provided" });
            }
        } catch (error) {
            console.error("Error deleting contact:", error);
            res.status(500).json({ error: "Failed to delete contact" });
        }
    }
}
