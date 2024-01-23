import axios from "axios"
import type { Product, CreateProductPayload } from "../interfaces"
const api = import.meta.env.VITE_API_ENDPOINT

export const createProductHelper = async(product: Product):Promise<boolean> => {
  let success:boolean = false
  try {
    const url = `${api}/createProduct`
    const payload:CreateProductPayload = {
      name: product.name,
      description: product.description,
      quantity: product.quantity,
      amount: product.amount,
      hasWholesale: product.hasWholesale,
      amountWholesale: product.amountWholesale
    }
    await axios.post(url, {...payload})
    success = true
  } catch(error) {
    success = false
    console.log(error)
  }

  return success
}