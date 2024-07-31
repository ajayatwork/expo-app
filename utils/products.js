import axios from 'axios';

export const getProducts = async ()=>{
    const res = await axios.get("https://dummyjson.com/products?limit=10");
    return res;
}

export const getAllProducts = async (limit=10)=>{
    const res = await axios.get(`https://dummyjson.com/products?limit=${limit}&skip=10`);
    return res;
} 

export const getSingleProduct = async (id)=>{
    const res = await axios.get(`https://dummyjson.com/products/${id}`);
    return res;
}

export const getAllCategories = async()=>{
    const res = await axios.get(`https://dummyjson.com/products/category-list`);
    return res;
}