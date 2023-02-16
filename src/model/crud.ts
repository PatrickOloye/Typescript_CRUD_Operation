import * as mongoose from 'mongoose';
import { Model } from 'mongoose';

type ProductType = ProductModel & mongoose.Document;
export interface ProductModel {
    title: {
        type: String;
        required: true;
    };
    description: {
        type: String;
        required: true;
    };
    imageUrl: {
        type: String;
        required: true;
    };
    price: {
        type: Number;
        required: true;
    };
}
const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});
const Product: Model<ProductType> = mongoose.model<ProductType>('Product', ProductSchema);
export default Product;
