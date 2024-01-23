export interface Product {
  name: string
  description: string
  quantity: number
  amount: number
  hasWholesale: boolean
  amountWholesale?: number
  status: string
  imageUrl?: string
}
export interface CreateProductPayload {
  name: string
  description: string
  quantity: number
  amount: number
  hasWholesale: boolean
  amountWholesale?: number
}