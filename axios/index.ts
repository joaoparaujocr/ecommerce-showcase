import axios, { AxiosRequestConfig } from "axios";
import { Product } from "../interfaces/Product";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
})

export const getProducts = async (config?: AxiosRequestConfig) => {
  return await axiosInstance.get<Product[]>('/products', config)
}