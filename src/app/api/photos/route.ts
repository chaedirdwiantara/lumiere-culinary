import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { PhotoFilters, PaginatedResponse, Photo } from '@/types'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const filters: PhotoFilters = {
      category: searchParams.get('category') || undefined,
      is_featured: searchParams.get('is_featured') === 'true' ? true : undefined,
      is_published: searchParams.get('is_published') !== 'false', // Default to true
      search: searchParams.get('search') || undefined,
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '12'),
      sort_by: (searchParams.get('sort_by') as any) || 'created_at',
      sort_order: (searchParams.get('sort_order') as any) || 'desc',
    }

    const supabase = createServerClient()
    
    let query = supabase
      .from('photos')
      .select(`
        *,
        categories:photo_categories(
          category:categories(*)
        ),
        quotes:photo_quotes(*),
        media:photo_media(*)
      `)

    // Apply filters
    if (filters.is_published !== undefined) {
      query = query.eq('is_published', filters.is_published)
    }

    if (filters.is_featured !== undefined) {
      query = query.eq('is_featured', filters.is_featured)
    }

    if (filters.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
    }

    if (filters.category) {
      query = query.eq('photo_categories.categories.slug', filters.category)
    }

    // Get total count for pagination
    const { count } = await supabase
      .from('photos')
      .select('*', { count: 'exact', head: true })

    // Apply sorting and pagination
    const from = ((filters.page || 1) - 1) * (filters.limit || 12)
    const to = from + (filters.limit || 12) - 1

    query = query
      .order(filters.sort_by || 'created_at', { ascending: filters.sort_order === 'asc' })
      .range(from, to)

    const { data: photos, error } = await query

    if (error) {
      console.error('Error fetching photos:', error)
      return NextResponse.json(
        { error: 'Failed to fetch photos' },
        { status: 500 }
      )
    }

    const response: PaginatedResponse<Photo> = {
      data: photos || [],
      total: count || 0,
      page: filters.page || 1,
      limit: filters.limit || 12,
      totalPages: Math.ceil((count || 0) / (filters.limit || 12)),
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error in GET /api/photos:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      description,
      file_path,
      file_size,
      mime_type,
      width,
      height,
      camera_model,
      lens,
      focal_length,
      aperture,
      shutter_speed,
      iso,
      taken_at,
      location,
      is_featured = false,
      is_published = true,
      sort_order = 0,
      categories = [],
    } = body

    if (!title || !file_path) {
      return NextResponse.json(
        { error: 'Title and file_path are required' },
        { status: 400 }
      )
    }

    const supabase = createServerClient()

    // Insert photo
    const { data: photo, error: photoError } = await supabase
      .from('photos')
      .insert({
        title,
        description,
        file_path,
        file_size,
        mime_type,
        width,
        height,
        camera_model,
        lens,
        focal_length,
        aperture,
        shutter_speed,
        iso,
        taken_at,
        location,
        is_featured,
        is_published,
        sort_order,
      })
      .select()
      .single()

    if (photoError) {
      console.error('Error creating photo:', photoError)
      return NextResponse.json(
        { error: 'Failed to create photo' },
        { status: 500 }
      )
    }

    // Associate with categories if provided
    if (categories.length > 0 && photo) {
      const categoryAssociations = categories.map((categoryId: string) => ({
        photo_id: photo.id,
        category_id: categoryId,
      }))

      const { error: categoryError } = await supabase
        .from('photo_categories')
        .insert(categoryAssociations)

      if (categoryError) {
        console.error('Error associating categories:', categoryError)
        // Don't fail the request, just log the error
      }
    }

    return NextResponse.json({ data: photo }, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/photos:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}