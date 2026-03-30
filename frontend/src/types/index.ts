export interface Character {
  id: number
  name: string
  sanskritName: string | null
  otherNames: string[] | null
  category: '佛' | '菩萨' | '罗汉' | '护法' | '其他'
  summary: string
  story: string | null
  scripture: string | null
  imageUrl: string | null
  isHot: boolean
  createdAt: string
  updatedAt: string
}

export interface CharacterDetail extends Character {
  contributions?: { id: number; data: string }[]
}

export interface Category {
  name: string
  count: number
}

export interface Pagination {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  pagination?: Pagination
  error?: {
    code: string
    message: string
    details?: Record<string, string[]>
  }
}
