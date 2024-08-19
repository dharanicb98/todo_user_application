import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL ||  'http://localhost:5000'

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAllCustomers = async () => {
    const response = await axiosInstance.get(`/api/customers`);
    return response?.data;
};

export const createCustomer = async (body) => {
  const response = await axiosInstance.post(`/api/customers`, body);
  return response?.data;
};

export const updateCustomer = async (id, body) => {
  const response = await axiosInstance.put(`/api/customers/${id}`, body);
  return response?.data;
};

export const deleteCustomer = async (id) => {
  const response = await axiosInstance.delete(`/api/customers/${id}`);
  return response?.data;
};