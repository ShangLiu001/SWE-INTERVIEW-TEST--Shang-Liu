const express = require('express');
const cors = require('cors'); // Import the CORS package
require('dotenv').config();

const app = express();
// Port changed to 5001 since I got another app running 5000
const PORT = process.env.PORT || 5001;

app.use(express.json());
// Enable react build in CORS 
app.use(cors()); 

// Function to generate a URL for getting a random image from picsum
const fetchImageUrl = () => {
    return `https://picsum.photos/200/200?random=${Math.floor(Math.random() * 1000)}`;
};

// Products array
let products = [
    { id: 1, name: 'Product 1', description: 'description 1', price: 100, imageUrl: fetchImageUrl() },
    { id: 2, name: 'Product 2', description: 'description 2', price: 200, imageUrl: fetchImageUrl() },
    { id: 3, name: 'Product 3', description: 'description 3', price: 300, imageUrl: fetchImageUrl() },
    { id: 4, name: 'Product 4', description: 'description 4', price: 150, imageUrl: fetchImageUrl() },
    { id: 5, name: 'Product 5', description: 'description 5', price: 500, imageUrl: fetchImageUrl() },
    { id: 6, name: 'Product 6', description: 'description 6', price: 50, imageUrl: fetchImageUrl() },
];

// Get API for getting ALL products
app.get('/api/products', (req, res) => {
    res.json(products); 
});

// Delete API for deleting a product by ID
app.delete('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const productIndex = products.findIndex(product => product.id === parseInt(id));

    if (productIndex !== -1) {
        // Remove the product from the array permanently
        products.splice(productIndex, 1); 
        res.status(200).json({ message: 'Product deleted successfully.' });
    } else {
        res.status(404).json({ message: 'Product not found.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
