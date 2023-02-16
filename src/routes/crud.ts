import { Router } from 'express';
import { createProduct, getAllProducts, getProduct, updateProduct, deleteProduct } from '../controller/crud';

const router = Router();

router.post('/api/product', createProduct);

router.get('/api/products', getAllProducts);

router.get('/api/product/:id', getProduct);

router.patch('/api/product/:id', updateProduct);

router.delete('/api/product/:id', deleteProduct);

export default router;
