import Education from '../../models/Education';
import { mongooseConnect } from '@/lib/mongoose';

export default async function handler(req, res) {
  await mongooseConnect(); // Connect to your MongoDB
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        // Check if an id query parameter is provided.
        if (req.query.id) {
          const education = await Education.findById(req.query.id);
          if (education) {
            res.status(200).json(education);
          } else {
            res.status(404).json({ error: 'Education entry not found' });
          }
        } else {
          // If no id is provided, return all education entries.
          const educations = await Education.find({});
          res.status(200).json(educations);
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;

    case 'POST':
      try {
        const { section, period, institution, degree } = req.body;
        const newEducation = new Education({ section, period, institution, degree });
        await newEducation.save();
        res.status(201).json(newEducation);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;

    case 'PUT':
      try {
        const { id, section, period, institution, degree } = req.body;
        const updatedEducation = await Education.findByIdAndUpdate(
          id,
          { section, period, institution, degree },
          { new: true }
        );
        if (updatedEducation) {
          res.status(200).json(updatedEducation);
        } else {
          res.status(404).json({ error: 'Education entry not found' });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;

    case 'DELETE':
      try {
        const { id } = req.query;
        await Education.findByIdAndDelete(id);
        res.status(200).json({ message: 'Education entry deleted' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
