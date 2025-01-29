import { mongooseConnect } from "@/lib/mongoose";
import Contact from "@/models/contact";


export default async function handle(req, res) {
    await mongooseConnect();
    const { method } = req;

    if (method === 'POST') {
        const { name, lname, email, description, company, phone, country, price, project } = req.body;
        const experienceDoc = await Contact.create({
            name, lname, email, description, company, phone, country, price, project
        })
        res.json(experienceDoc)
    }

    if (method == "GET") {
        if (req.query?.id) {
            res.json(await Contact.findById(req.query.id))
        } else {
            res.json((await Contact.find()).reverse())
        }
    }

    if (method === 'PUT') {
        const { _id, name, lname, email, description, company, phone, country, price, project } = req.body;
        await Contact.updateOne({ _id }, {
            name, lname, email, description, company, phone, country, price, project
        })
        res.json(true)
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
            await Contact.deleteOne({ _id: req.query?.id })
            res.json(true)
        }
    }
}