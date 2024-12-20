import db from '@/lib/knex';
import {authenticate} from '@/lib/auth';

export default async function handler(req:any, res:any) {
  switch(req.method) {
    case 'GET': {
      try {
      const {productId} = req.query;
        const products = await db('products').where({id:productId}).first()
        res.status(200).json(products);
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
      const { productId } = req.query;

      // Ensure `id` is provided
      if (!productId) {
        return res.status(400).json({ error: 'ID is required for updates.' });
      }

      // Perform the partial update in the database
      const updatedProduct = await db('products')
        .where({ id :productId})
        .update(updates)
        .returning('*');

      if (!updatedProduct.length) {
        return res.status(404).json({ error: 'product not found' });
      }

      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ error: 'Failed to update product' });
    }
    break;
  }
  }
}
