import { mongooseConnect } from "@/lib/mongoose";
import Service from "@/models/Service";

export default async function handler(req, res) {
  await mongooseConnect();
  const { method, query } = req;
  const { id } = query;

  switch (method) {
    case 'GET':
      try {
        if (id) {
          const service = await Service.findById(id);
          res.status(200).json(service);
        } else {
          const services = await Service.find({});
          res.status(200).json(services);
        }
      } catch (error) {
        console.error("GET /api/services error:", error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case 'POST':
      try {
        const service = await Service.create(req.body);
        res.status(201).json(service);
      } catch (error) {
        console.error("POST /api/services error:", error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case 'PUT':
      try {
        const { id, ...data } = req.body;
        const updatedService = await Service.findByIdAndUpdate(id, data, { new: true });
        res.status(200).json(updatedService);
      } catch (error) {
        console.error("PUT /api/services error:", error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case 'DELETE':
      try {
        await Service.findByIdAndDelete(id);
        res.status(200).json({ success: true });
      } catch (error) {
        console.error("DELETE /api/services error:", error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
