// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import db from "@/lib/knex"; 
import { authenticate } from "@/lib/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch(req.method) {
    case 'GET': {
       try{
        const {discountCode}  = req.query;


       
        // Check if discountCode is provided
        if (!discountCode) {
            return res.status(400).json({ error: "Discount code is required" });
        }

        //check if its a string
        if (typeof discountCode !== 'string') {
            return res.status(400).json({ error: 'Valid discount code is required' });
          }
        //look it up in db and return its information
        let discount = await db('discount_codes').where({code:discountCode.toUpperCase() }).first();
        if(!discount){
          return res.status(404).json({error: 'Discount not found'});
        }
        else{
          return res.status(200).json(discount);
        }
       }
       catch(error){
        console.error('Error', error);
        res.status(500).json({ error: 'Failed to validate discount' });
       }
    }
  }
}
