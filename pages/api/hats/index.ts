import db from '@/lib/knex';



export default async function handler(req:any, res:any) {
  switch (req.method) {
    case 'GET' : {
      try {
        const hats = await db('hats').select('*');
        res.status(200).json(hats);
      } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
      }
    }
    case "POST": {
      try {
        const { 
          name,
          price,
          quantity,
          description,
          material, 
          primary_color,
          image_url
        } = req.body;
        const hat = await db('hats').insert({ name, price, quantity, description, material, primary_color,image_url}).returning('*');
        res.status(201).json(hat);
      } catch (error) {
          console.error('Error creating product:', error);
          res.status(500).json({ error: 'Failed to create product' });
      }
    }
  
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
