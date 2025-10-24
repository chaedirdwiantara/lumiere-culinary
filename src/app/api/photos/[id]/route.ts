import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const supabase = createServerClient()

    const { data: photo, error } = await supabase
      .from('photos')
      .select(`
        *,
        categories:photo_categories(
          category:categories(*)
        ),
        quotes:photo_quotes(*),
        media:photo_media(*)
      `)
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching photo:', error)
      return NextResponse.json(
        { error: 'Photo not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data: photo })
  } catch (error) {
    console.error('Error in GET /api/photos/[id]:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()
    const {
      title,
      description,
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
      categories = [],
    } = body

    const supabase = createServerClient()

    // Update photo
    const { data: photo, error: photoError } = await supabase
      .from('photos')
      .update({
        title,
        description,
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
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()

    if (photoError) {
      console.error('Error updating photo:', photoError)
      return NextResponse.json(
        { error: 'Failed to update photo' },
        { status: 500 }
      )
    }

    // Update category associations
    if (categories.length >= 0) {
      // Remove existing associations
      await supabase
        .from('photo_categories')
        .delete()
        .eq('photo_id', id)

      // Add new associations
      if (categories.length > 0) {
        const categoryAssociations = categories.map((categoryId: string) => ({
          photo_id: id,
          category_id: categoryId,
        }))

        const { error: categoryError } = await supabase
          .from('photo_categories')
          .insert(categoryAssociations)

        if (categoryError) {
          console.error('Error updating categories:', categoryError)
        }
      }
    }

    return NextResponse.json({ data: photo })
  } catch (error) {
    console.error('Error in PUT /api/photos/[id]:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const supabase = createServerClient()

    const { error } = await supabase
      .from('photos')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting photo:', error)
      return NextResponse.json(
        { error: 'Failed to delete photo' },
        { status: 500 }
      )
    }

    return NextResponse.json({ message: 'Photo deleted successfully' })
  } catch (error) {
    console.error('Error in DELETE /api/photos/[id]:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}