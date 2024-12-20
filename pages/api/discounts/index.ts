// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import db from "@/lib/knex"; 
import { authenticate } from "@/lib/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    try{
        const admin = authenticate(req);
    }
    catch(error){
        console.log(error)
        return res.status(401).json({ error: 'Unauthorized' });
    }
  switch(req.method) {
    case 'GET': {
        try {
            const discounts = await db('discount_codes').select('*');
            res.status(200).json(discounts);
        } catch (error) {
            console.error('Error fetching discounts:', error);
            res.status(500).json({ error: 'Failed to fetch discounts' });
        }
      
    }
    case 'POST': {
       try{
        const {code, type, amount, valid_from, valid_to} = req.body;
        const valid_from_date = new Date(valid_from);
        const valid_to_date = new Date(valid_to);
        const discount = await db('discount_codes').insert({code:code.toUpperCase(), type, amount, valid_from: valid_from_date, valid_to: valid_to_date}).returning('*');
        return res.status(201).json(discount);
       }
       catch(error){
        console.error('Error creating discount:', error);
        res.status(500).json({ error: 'Failed to create discount' });
       }
    }
  }
}
