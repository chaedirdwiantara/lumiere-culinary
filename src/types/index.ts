export interface Photo {
  id: string
  title: string
  description?: string
  file_path: string
  file_size?: number
  mime_type?: string
  width?: number
  height?: number
  camera_model?: string
  lens?: string
  focal_length?: string
  aperture?: string
  shutter_speed?: string
  iso?: number
  taken_at?: string
  location?: string
  is_featured: boolean
  is_published: boolean
  sort_order: number
  created_at: string
  updated_at: string
  categories?: Category[]
  quotes?: PhotoQuote[]
  media?: PhotoMedia[]
}

export interface Category {
  id: string
  name: string
  description?: string
  slug: string
  created_at: string
  updated_at: string
}

export interface PhotoCategory {
  id: string
  photo_id: string
  category_id: string
  created_at: string
}

export interface PhotoQuote {
  id: string
  photo_id: string
  quote: string
  author?: string
  created_at: string
}

export interface PhotoMedia {
  id: string
  photo_id: string
  file_path: string
  media_type: 'thumbnail' | 'medium' | 'large' | 'original'
  file_size?: number
  width?: number
  height?: number
  created_at: string
}

export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface PhotoFilters {
  category?: string
  is_featured?: boolean
  is_published?: boolean
  search?: string
  page?: number
  limit?: number
  sort_by?: 'created_at' | 'title' | 'sort_order'
  sort_order?: 'asc' | 'desc'
}

export interface UploadResponse {
  file_path: string
  file_size: number
  mime_type: string
  width?: number
  height?: number
}

export interface Award {
  id: string
  title: string
  year: string
  organization: string
  description?: string
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'user'
  created_at: string
  updated_at: string
}

export interface FilterOptions {
  category?: string
  is_featured?: boolean
  is_published?: boolean
  search?: string
}

export interface SortOptions {
  sort_by?: 'created_at' | 'title' | 'sort_order'
  sort_order?: 'asc' | 'desc'
}