import db from '@/lib/knex';



export default async function handler(req:any, res:any) {
  switch (req.method) {
    case 'GET' : {
      try {
        const query = db('products')
        const {type} = req.query; 
        if(type){
          query.where({type})

        }
        const products = await query.select('*');
        res.status(200).json(products);
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
          type,
          quantity,
          description,
          material, 
          primary_color,
          image_url
        } = req.body;
        const product = await db('products').insert({ name, price,type, quantity, description, material, primary_color,image_url}).returning('*');
        res.status(201).json(product);
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
