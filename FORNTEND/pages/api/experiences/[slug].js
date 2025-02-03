import { mongooseConnect } from '@/lib/mongoose';
import { Experience } from '@/models/Experience';
import { Comment } from '@/models/Comment';

export default async function handler(req, res) {

    const { slug } = req.query;

    await mongooseConnect();

    if (req.method === 'GET') {
        try {
            const experience = await Experience.findOne({ slug });

            if (!experience) {
                return res.status(404).json({ message: "Experience Not found" })
            }

            const comments = await Comment.find({ experience: experience._id }).sort({ createdAt: -1 });

            res.status(200).json({ experience, comments })

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'server error' })
        }
    } else if (req.method === 'POST') {
        try {
            const { name, email, title, contentpera, maincomment, parent } = req.body;

            const experience = await Experience.findOne({ slug });

            if (!experience) {
                return res.status(404).json({ message: "Experience Not Found" })
            }

            if (parent) {
                const parentComment = await Comment.findById(parent);

                if (!parentComment) {
                    return res.status(404).json({ message: 'parent comment not found' })
                }

                const newComment = new Comment({
                    name,
                    email,
                    title,
                    contentpera,
                    maincomment,
                    parent: parentComment._id,
                    experience: experience._id,
                    parentName: parentComment.name
                })

                await newComment.save();

                parentComment.childern.push(newComment._id);

                await parentComment.save();

                res.status(201).json(newComment);
            } else {
                const newComment = new Comment({
                    name,
                    email,
                    title,
                    contentpera,
                    maincomment,
                    experience: experience._id,
                });

                await newComment.save();

                res.status(201).json(newComment);
            }

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'server error' })
        }
    } else {
        res.setHeader('Allow', ['Get', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }

}
