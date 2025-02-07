// /pages/api/contacts/[id].js

import { mongooseConnect } from '@/lib/mongoose';
import { Contact } from '@/models/contact';  // ✅ Fix: Use named import


export default async function handle(req, res) {
  const { method } = req;
  const { id } = req.query;
  await mongooseConnect();

  switch (method) {
    case 'GET': {
      try {
        const contact = await Contact.findById(id);
        if (!contact) {
          return res.status(404).json({ message: 'Not found' });
        }
        return res.status(200).json(contact);
      } catch (error) {
        console.error('GET single contact error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    }
    default: {
      res.setHeader('Allow', ['GET']);
      res.status(405).json({ message: `Method ${method} Not Allowed` });
    }
  }
}
