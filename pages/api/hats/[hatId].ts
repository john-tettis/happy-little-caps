import db from '@/lib/knex';
import {authenticate} from '@/lib/auth';

export default async function handler(req:any, res:any) {
  switch(req.method) {
    case 'GET': {
      try {
      const {hatId} = req.query;
        const hats = await db('hats').where({id:hatId}).first()
        res.status(200).json(hats);
      } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
     } 
   }
   case 'PATCH': {
    try {
      //authenticate admin
      const admin = authenticate(req); 
      // Validate request body using the schema
      const { ...updates } = req.body;
      const { hatId } = req.query;

      // Ensure `id` is provided
      if (!hatId) {
        return res.status(400).json({ error: 'ID is required for updates.' });
      }

      // Perform the partial update in the database
      const updatedHat = await db('hats')
        .where({ id :hatId})
        .update(updates)
        .returning('*');

      if (!updatedHat.length) {
        return res.status(404).json({ error: 'Hat not found' });
      }

      res.status(200).json(updatedHat);
    } catch (error) {
      console.error('Error updating hat:', error);
      res.status(500).json({ error: 'Failed to updatehat' });
    }
    break;
  }
  }
}
