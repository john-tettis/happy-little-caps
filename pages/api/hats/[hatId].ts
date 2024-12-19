import db from '@/lib/knex';

export default async function handler(req:any, res:any) {
  if (req.method === 'GET') {
    try {
    const {hatId} = req.query;
      const hats = await db('hats').where({id:hatId}).first()
      res.status(200).json(hats);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  }
}
