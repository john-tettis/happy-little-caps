// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { authenticate } from "@/lib/auth";
import db from "@/lib/knex";


export default async function handler(req:any, res:any) {
  const { discountId } = req.query; // Extract `id` from the request query
  console.log(discountId)

  
  if (req.method === 'DELETE') {
    try {
      ///validate admin
      const admin = authenticate(req);
      // Validate the ID
      if (!discountId || isNaN(Number(discountId))) {
        return res.status(400).json({ error: 'Invalid ID' });
      }

      // Perform the delete operation
      const result = await db('discount_codes').where('id', discountId).del();

      if (result === 0) {
        return res.status(404).json({ error: 'Hat not found' });
      }

      res.status(200).json({ message: `Hat with ID ${discountId} deleted successfully` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
