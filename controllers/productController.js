import Product from '../models/Product.js';

export const createProduct = async (req, res) => {
    try {
        const { name, price, description, img, imga, imgb, category, stock } = req.body;
        const product = new Product({
            name,
            price,
            description,
            img,
            imga,
            imgb,
            category,
            stock
        });
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category');
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const searchProduct = async (req, res) => {
    const keyword = req.query.q;
    try {
      const result = await Product.find({
        name: { $regex: keyword, $options: 'i' } // tìm không phân biệt hoa thường
      });
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: 'Search error', error: err });
    }
  };