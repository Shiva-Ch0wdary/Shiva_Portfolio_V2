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
                return res.status(404).json({ message: "Experience Not Found" });
            }

            // Fetch comments and populate parent-child relationships
            const comments = await Comment.find({ experience: experience._id })
                .sort({ createdAt: -1 })
                .lean();

            const commentMap = new Map();

            comments.forEach(comment => {
                comment.children = []; // Ensure children are initialized
                commentMap.set(comment._id.toString(), comment);
            });

            comments.forEach(comment => {
                if (comment.parent) {
                    const parentComment = commentMap.get(comment.parent.toString());
                    if (parentComment) {
                        parentComment.children.push(comment);
                    }
                }
            });

            // Get only top-level comments (comments without a parent)
            const topLevelComments = comments.filter(comment => !comment.parent);

            res.status(200).json({ experience, comments: topLevelComments });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    } 
    else if (req.method === 'POST') {
        try {
            const { name, email, title, contentpera, parent } = req.body;

            const experience = await Experience.findOne({ slug });

            if (!experience) {
                return res.status(404).json({ message: "Experience Not Found" });
            }

            const newComment = new Comment({
                name,
                email,
                title,
                contentpera,
                maincomment: parent ? false : true, // False if it's a reply
                experience: experience._id,
                parent: parent || null, // Set parent if replying
                parentName: parent ? (await Comment.findById(parent)).name : null
            });

            await newComment.save();

            if (parent) {
                const parentComment = await Comment.findById(parent);
                if (!parentComment) {
                    return res.status(404).json({ message: 'Parent comment not found' });
                }

                // Ensure the parent has a `children` array before pushing
                parentComment.children = parentComment.children || [];
                parentComment.children.push(newComment._id);
                await parentComment.save();
            }

            // Fetch updated comments list to send back
            const updatedComments = await Comment.find({ experience: experience._id }).sort({ createdAt: -1 });

            res.status(201).json({ newComment, updatedComments });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    } 
    else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
