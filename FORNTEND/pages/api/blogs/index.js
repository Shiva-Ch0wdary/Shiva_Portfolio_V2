import { mongooseConnect } from "@/lib/mongoose";
import { Experience } from "@/models/Blog";

export default async function handle(req, res) {


    await mongooseConnect();

    const { method } = req;

    if (method === 'GET') {
        if (req.query?.id) {
            const ExperienceS = await Experience.findById(req.query.id);
            res.json(ExperienceS);
        } else if (req.query?.experiencecategory) {
            const projectcate = await Experience.find({ experiencecategory: req.query.experiencecategory });
            res.json(projectcate);
        } else if (req.query?.tags) {
            const projectcate = await Experience.find({ tags: req.query.tags });
            res.json(projectcate);
        } else if (req.query?.slug) {
            const projectslug = await Experience.find({ slug: req.query.slug });
            res.json(projectslug.reverse());
        } else {
            const ExperienceS = await Experience.find();
            res.json(ExperienceS.reverse());
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}