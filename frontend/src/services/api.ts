import axios from 'axios'
import type { ApiResponse, Character, CharacterDetail, Category, Pagination } from '../types'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

export const characterApi = {
  list: async (params?: {
    category?: string
    page?: number
    pageSize?: number
    sort?: string
    order?: string
  }): Promise<{ data: Character[]; pagination: Pagination }> => {
    const response = await api.get<ApiResponse<Character[]>>('/characters', { params })
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error?.message || 'Failed to fetch characters')
    }
    return { data: response.data.data, pagination: response.data.pagination! }
  },

  getById: async (id: number): Promise<CharacterDetail> => {
    const response = await api.get<ApiResponse<CharacterDetail>>(`/characters/${id}`)
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error?.message || 'Failed to fetch character')
    }
    return response.data.data
  },

  categories: async (): Promise<Category[]> => {
    const response = await api.get<ApiResponse<Category[]>>('/characters/categories')
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error?.message || 'Failed to fetch categories')
    }
    return response.data.data
  },

  hot: async (limit?: number): Promise<Character[]> => {
    const response = await api.get<ApiResponse<Character[]>>('/characters/hot', {
      params: { limit },
    })
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error?.message || 'Failed to fetch hot characters')
    }
    return response.data.data
  },

  search: async (q: string, category?: string): Promise<Character[]> => {
    const response = await api.get<ApiResponse<Character[]>>('/characters/search', {
      params: { q, category },
    })
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error?.message || 'Failed to search characters')
    }
    return response.data.data
  },
}

export const contributionApi = {
  submit: async (data: {
    type: '新增角色' | '补充数据'
    data: Record<string, any>
    submitterName: string
    submitterEmail?: string
  }): Promise<{ id: number }> => {
    const response = await api.post('/contributions', data)
    if (!response.data.success) {
      throw new Error((response.data as any).error?.message || 'Failed to submit contribution')
    }
    return { id: response.data.id }
  },
}
