import Experience from "@/models/Experience";
import { mongooseConnect } from "@/lib/mongoose";


export default async function handle(req, res) {
    await mongooseConnect();
    const { method } = req;

    if (method === 'POST') {
        const { title, slug, images, description, experiencecategory, tags, status } = req.body;
        const experienceDoc = await Experience.create({
            title, slug, images, description, experiencecategory, tags, status
        })
        res.json(experienceDoc)
    } 

    if (method == "GET") {
        if (req.query?.id) {
            res.json(await Experience.findById(req.query.id))
        } else {
            res.json((await Experience.find()).reverse())
        }
    }

    if (method === 'PUT') {
        const { _id, title, slug, images, description, experiencecategory, tags, status } = req.body;
        await Experience.updateOne({ _id }, {
            title, slug, images, description, experiencecategory, tags, status
        })
        res.json(true)
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
            await Experience.deleteOne({ _id: req.query?.id })
            res.json(true)
        }
    }
}