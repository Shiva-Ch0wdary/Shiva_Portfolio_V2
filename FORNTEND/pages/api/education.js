import Education from '../../models/Education';
import { mongooseConnect } from '@/lib/mongoose';

export default async function handler(req, res) {
  await mongooseConnect(); // Connect to your MongoDB
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const educations = await Education.find({});
        res.status(200).json(educations);
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
        res.status(200).json(updatedEducation);
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

