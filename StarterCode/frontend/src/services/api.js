// src/api.js
import axios from "axios";

// Set the base URL of your backend
const API_BASE_URL = "http://localhost:5001/api/products";

export const fetchProducts = () => axios.get(API_BASE_URL);

export const deleteProduct = (id) => axios.delete(`${API_BASE_URL}/${id}`);
