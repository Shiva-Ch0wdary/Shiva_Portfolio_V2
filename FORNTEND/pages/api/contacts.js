import { mongooseConnect } from "@/lib/mongoose";
import { Contact } from "@/models/contact";

export default async function handle(req, res) {

    await mongooseConnect();

    const { method } = req;
    if (method === 'POST') {
        try {
            const { name, lname, email, description, company, phone, country, price, project  } = req.body;

            const contactDoc = await Contact.create({
                name, lname, email, description, company, phone, country, price, project 
            });

            res.status(201).json(contactDoc);
        } catch (error) {
            console.error('Error creating:', error);
            res.status(500).json({ error: 'failed to create contact' })
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`method ${method} not allowed!`)
    }

}
