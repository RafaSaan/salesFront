export interface Product {
  id: number
  name: string
  description: string
  quantity: number
  amount: number
  hasWholesale: boolean
  amountWholesale?: number
  status: string
  statusCode?: string
  statusId: number
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
export interface UpdateProductPayload {
  id: number
  name: string
  description: string
  quantity: number
  amount: number
  hasWholesale: boolean
  amountWholesale?: number
  statusCode?: string
}