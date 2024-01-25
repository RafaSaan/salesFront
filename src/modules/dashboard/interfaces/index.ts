export interface Product {
  id?: string
  name: string
  description: string
  quantity: number
  amount: number
  hasWholesale: boolean
  amountWholesale?: number
  status: string
  statusCode?: string
  statusId?: string
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
  id?: string
  name: string
  description: string
  quantity: number
  amount: number
  hasWholesale: boolean
  amountWholesale?: number
  statusCode?: string
}