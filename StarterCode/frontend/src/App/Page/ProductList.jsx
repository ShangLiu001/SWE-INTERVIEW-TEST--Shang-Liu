import React, { useEffect, useState } from 'react';
import { fetchProducts, deleteProduct } from '../../services/api'; 
import { Grid, Card, CardContent, Typography, CardMedia, IconButton, Container } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts()
      .then((response) => setProducts(response.data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const handleDelete = (id) => {
    deleteProduct(id)
      .then(() => {
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
      })
      .catch((error) => console.error('Error deleting product:', error));
  };

  return (
    <Container 
      maxWidth="md" 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        // Center everything
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh'
      }}
    >
       
      <Typography variant="h4" gutterBottom align="center">
        Simple Card List
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {products.map((product) => (
          // Responsive design
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ maxWidth: 345, position: 'relative' }}>
              <CardMedia
                component="img"
                height="160"
                image={product.imageUrl}
                alt={product.name}
              />
              <IconButton
                onClick={() => handleDelete(product.id)}
                color="error"
                sx={{ position: 'absolute', top: 8, left: 8 }}
              >
                <DeleteIcon />
              </IconButton>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {product.description}
                </Typography>
                <Typography variant="h6" color="textPrimary">
                  ${product.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;
