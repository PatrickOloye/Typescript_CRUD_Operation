import { Request, Response } from 'express';
import Product, { ProductModel } from '../model/crud';

// Create a new product
export const createProduct = async (req: Request, res: Response) => {
    
    try {
        const data: ProductModel = req.body;
        console.log('Data', data);
        let product = await Product.create(data);
        return res.status(200).json({ message: 'Product created successfully', data: product });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

// Get all products with pagination implemented
export const getAllProducts = async (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;

    const pageAsNumber = typeof page === 'string' ? parseInt(page, 10) : (page as number);
    const limitAsNumber = typeof limit === 'string' ? parseInt(limit, 10) : (limit as number);

    try {
        const products = await Product.find()
            .limit(limitAsNumber)
            .skip((pageAsNumber - 1) * limitAsNumber)
            .exec();

        const count = await Product.countDocuments();

        res.json({
            products,
            totalPages: Math.ceil(count / limitAsNumber),
            currentPage: pageAsNumber
        });
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

// Get a single product by ID
export const getProduct = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id).exec();

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

// Update a product by ID
export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
            new: true
        }).exec();

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(updatedProduct);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

// Delete a product by ID
export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deletedProduct = await Product.findByIdAndDelete(id).exec();

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ msg: 'product deleted' });
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};
