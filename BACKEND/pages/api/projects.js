import {Project} from "@/models/Project"
import { mongooseConnect } from "@/lib/mongoose";


export default async function handle(req, res) {
    await mongooseConnect();
    const { method } = req;

    if (method === 'POST') {
        const { title, slug, images, description, projectcategory, client, tags, status, livepreview } = req.body;
        const experienceDoc = await Project.create({
            title, slug, images, description, projectcategory, client, tags, status, livepreview
        })
        res.json(experienceDoc)
    } 

    if (method == "GET") {
        if (req.query?.id) {
            res.json(await Project.findById(req.query.id))
        } else {
            res.json((await Project.find()).reverse())
        }
    }

    if (method === 'PUT') {
        const { _id, title, slug, images, description, projectcategory, client, tags, status, livepreview } = req.body;
        await Project.updateOne({ _id }, {
            title, slug, images, description, projectcategory, client, tags, status, livepreview
        })
        res.json(true)
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
            await Project.deleteOne({ _id: req.query?.id })
            res.json(true)
        }
    }
}