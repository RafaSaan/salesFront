import axios from "axios"
import type { Product, CreateProductPayload, UpdateProductPayload } from "../interfaces"
const api = import.meta.env.VITE_API_ENDPOINT

export const createProductHelper = async(product: CreateProductPayload):Promise<boolean> => {
  let success:boolean = false
  try {
    const url = `${api}/createProduct`
    await axios.post(url, {...product})
    success = true
  } catch(error) {
    success = false
    console.log(error)
  }

  return success
}

export const updateProductHelper = async(product: Product):Promise<boolean> => {
  let success:boolean = false
  try {
    const url = `${api}/updateProduct`
    const payload:UpdateProductPayload = {
      id: product.id,
      name: product.name,
      description: product.description,
      quantity: product.quantity,
      amount: product.amount,
      hasWholesale: product.hasWholesale,
      amountWholesale: product.amountWholesale,
      statusCode: product.statusCode
    }
    await axios.put(url, {...payload})
    success = true
  } catch(error) {
    success = false
    console.log(error)
  }

  return success
}

export const getProductsHelper = async():Promise<Product[]> => {
  let products:Product[] = [

  ]
  try {
    const url = `${api}/getProducts`
    const payload:object = {
      rowsPerPage: 10,
      page: 1
    }
    const { data } = await axios.get(url, {...payload})
    products = data.products
  } catch(error) {
    products = []
    console.log(error)
  }

  return products
}
export const enableOrDisableWholesaleHelper = async(id:number, hasWholesale: boolean):Promise<boolean> => {
  let success:boolean = false

  try {
    const url = `${api}/enableOrDisableWholesaleProduct/${id}`
    await axios.patch(url, {hasWholesale})
    success = true
  } catch(error) {
    success = false
    console.log(error)
  }

  return success
}
export const deleteProductHelper = async(id:number):Promise<boolean> => {
  let success:boolean = false

  try {
    const url = `${api}/deleteProduct/${id}`
    await axios.delete(url)
    success = true
  } catch(error) {
    success = false
    console.log(error)
  }

  return success
}