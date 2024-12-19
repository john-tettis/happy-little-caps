import db from '@/lib/knex';

export default async function handler(req:any, res:any) {
  if (req.method === 'GET') {
    try {
      const hats = await db('hats').select('*');
      res.status(200).json(hats);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  }
}
