import swaggerJSDoc from 'swagger-jsdoc'

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Lumiere API',
      version: '1.0.0',
      description: 'API documentation for Lumiere food photography portfolio',
      contact: {
        name: 'Lumiere Photography',
        email: 'contact@lumiere.com',
      },
    },
    servers: [
      {
        url: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Photo: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'Unique identifier for the photo',
            },
            title: {
              type: 'string',
              description: 'Title of the photo',
            },
            description: {
              type: 'string',
              description: 'Description of the photo',
            },
            file_path: {
              type: 'string',
              description: 'Path to the photo file',
            },
            file_size: {
              type: 'integer',
              description: 'File size in bytes',
            },
            mime_type: {
              type: 'string',
              description: 'MIME type of the file',
            },
            width: {
              type: 'integer',
              description: 'Width of the image in pixels',
            },
            height: {
              type: 'integer',
              description: 'Height of the image in pixels',
            },
            camera_model: {
              type: 'string',
              description: 'Camera model used',
            },
            lens: {
              type: 'string',
              description: 'Lens used',
            },
            focal_length: {
              type: 'string',
              description: 'Focal length setting',
            },
            aperture: {
              type: 'string',
              description: 'Aperture setting',
            },
            shutter_speed: {
              type: 'string',
              description: 'Shutter speed setting',
            },
            iso: {
              type: 'integer',
              description: 'ISO setting',
            },
            taken_at: {
              type: 'string',
              format: 'date-time',
              description: 'When the photo was taken',
            },
            location: {
              type: 'string',
              description: 'Location where photo was taken',
            },
            is_featured: {
              type: 'boolean',
              description: 'Whether the photo is featured',
            },
            is_published: {
              type: 'boolean',
              description: 'Whether the photo is published',
            },
            sort_order: {
              type: 'integer',
              description: 'Sort order for display',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'When the record was created',
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              description: 'When the record was last updated',
            },
          },
          required: ['id', 'title', 'file_path'],
        },
        Category: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'Unique identifier for the category',
            },
            name: {
              type: 'string',
              description: 'Name of the category',
            },
            description: {
              type: 'string',
              description: 'Description of the category',
            },
            slug: {
              type: 'string',
              description: 'URL-friendly slug for the category',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'When the record was created',
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              description: 'When the record was last updated',
            },
          },
          required: ['id', 'name', 'slug'],
        },
        ApiResponse: {
          type: 'object',
          properties: {
            data: {
              description: 'Response data',
            },
            error: {
              type: 'string',
              description: 'Error message if any',
            },
            message: {
              type: 'string',
              description: 'Success message if any',
            },
          },
        },
        PaginatedResponse: {
          type: 'object',
          properties: {
            data: {
              type: 'array',
              description: 'Array of items',
            },
            total: {
              type: 'integer',
              description: 'Total number of items',
            },
            page: {
              type: 'integer',
              description: 'Current page number',
            },
            limit: {
              type: 'integer',
              description: 'Number of items per page',
            },
            totalPages: {
              type: 'integer',
              description: 'Total number of pages',
            },
          },
        },
        UploadResponse: {
          type: 'object',
          properties: {
            file_path: {
              type: 'string',
              description: 'Path to the uploaded file',
            },
            file_size: {
              type: 'integer',
              description: 'Size of the uploaded file in bytes',
            },
            mime_type: {
              type: 'string',
              description: 'MIME type of the uploaded file',
            },
            width: {
              type: 'integer',
              description: 'Width of the image in pixels',
            },
            height: {
              type: 'integer',
              description: 'Height of the image in pixels',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Error message',
            },
          },
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    paths: {
      '/photos': {
        get: {
          tags: ['Photos'],
          summary: 'Get all photos',
          description: 'Retrieve a paginated list of photos with optional filtering',
          parameters: [
            {
              name: 'category',
              in: 'query',
              description: 'Filter by category slug',
              schema: { type: 'string' },
            },
            {
              name: 'is_featured',
              in: 'query',
              description: 'Filter by featured status',
              schema: { type: 'boolean' },
            },
            {
              name: 'is_published',
              in: 'query',
              description: 'Filter by published status',
              schema: { type: 'boolean', default: true },
            },
            {
              name: 'search',
              in: 'query',
              description: 'Search in title and description',
              schema: { type: 'string' },
            },
            {
              name: 'page',
              in: 'query',
              description: 'Page number',
              schema: { type: 'integer', default: 1 },
            },
            {
              name: 'limit',
              in: 'query',
              description: 'Number of items per page',
              schema: { type: 'integer', default: 12 },
            },
            {
              name: 'sort_by',
              in: 'query',
              description: 'Sort field',
              schema: { type: 'string', enum: ['created_at', 'title', 'sort_order'], default: 'created_at' },
            },
            {
              name: 'sort_order',
              in: 'query',
              description: 'Sort order',
              schema: { type: 'string', enum: ['asc', 'desc'], default: 'desc' },
            },
          ],
          responses: {
            200: {
              description: 'Successful response',
              content: {
                'application/json': {
                  schema: {
                    allOf: [
                      { $ref: '#/components/schemas/PaginatedResponse' },
                      {
                        properties: {
                          data: {
                            type: 'array',
                            items: { $ref: '#/components/schemas/Photo' },
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
            500: {
              description: 'Internal server error',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                },
              },
            },
          },
        },
        post: {
          tags: ['Photos'],
          summary: 'Create a new photo',
          description: 'Create a new photo record',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    title: { type: 'string' },
                    description: { type: 'string' },
                    file_path: { type: 'string' },
                    file_size: { type: 'integer' },
                    mime_type: { type: 'string' },
                    width: { type: 'integer' },
                    height: { type: 'integer' },
                    camera_model: { type: 'string' },
                    lens: { type: 'string' },
                    focal_length: { type: 'string' },
                    aperture: { type: 'string' },
                    shutter_speed: { type: 'string' },
                    iso: { type: 'integer' },
                    taken_at: { type: 'string', format: 'date-time' },
                    location: { type: 'string' },
                    is_featured: { type: 'boolean', default: false },
                    is_published: { type: 'boolean', default: true },
                    sort_order: { type: 'integer', default: 0 },
                    categories: {
                      type: 'array',
                      items: { type: 'string', format: 'uuid' },
                    },
                  },
                  required: ['title', 'file_path'],
                },
              },
            },
          },
          responses: {
            201: {
              description: 'Photo created successfully',
              content: {
                'application/json': {
                  schema: {
                    allOf: [
                      { $ref: '#/components/schemas/ApiResponse' },
                      {
                        properties: {
                          data: { $ref: '#/components/schemas/Photo' },
                        },
                      },
                    ],
                  },
                },
              },
            },
            400: {
              description: 'Bad request',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                },
              },
            },
            500: {
              description: 'Internal server error',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                },
              },
            },
          },
        },
      },
      '/photos/{id}': {
        get: {
          tags: ['Photos'],
          summary: 'Get a photo by ID',
          description: 'Retrieve a single photo by its ID',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: 'Photo ID',
              schema: { type: 'string', format: 'uuid' },
            },
          ],
          responses: {
            200: {
              description: 'Successful response',
              content: {
                'application/json': {
                  schema: {
                    allOf: [
                      { $ref: '#/components/schemas/ApiResponse' },
                      {
                        properties: {
                          data: { $ref: '#/components/schemas/Photo' },
                        },
                      },
                    ],
                  },
                },
              },
            },
            404: {
              description: 'Photo not found',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                },
              },
            },
          },
        },
        put: {
          tags: ['Photos'],
          summary: 'Update a photo',
          description: 'Update an existing photo',
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: 'Photo ID',
              schema: { type: 'string', format: 'uuid' },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    title: { type: 'string' },
                    description: { type: 'string' },
                    camera_model: { type: 'string' },
                    lens: { type: 'string' },
                    focal_length: { type: 'string' },
                    aperture: { type: 'string' },
                    shutter_speed: { type: 'string' },
                    iso: { type: 'integer' },
                    taken_at: { type: 'string', format: 'date-time' },
                    location: { type: 'string' },
                    is_featured: { type: 'boolean' },
                    is_published: { type: 'boolean' },
                    sort_order: { type: 'integer' },
                    categories: {
                      type: 'array',
                      items: { type: 'string', format: 'uuid' },
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Photo updated successfully',
              content: {
                'application/json': {
                  schema: {
                    allOf: [
                      { $ref: '#/components/schemas/ApiResponse' },
                      {
                        properties: {
                          data: { $ref: '#/components/schemas/Photo' },
                        },
                      },
                    ],
                  },
                },
              },
            },
            404: {
              description: 'Photo not found',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                },
              },
            },
            500: {
              description: 'Internal server error',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                },
              },
            },
          },
        },
        delete: {
          tags: ['Photos'],
          summary: 'Delete a photo',
          description: 'Delete an existing photo',
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: 'Photo ID',
              schema: { type: 'string', format: 'uuid' },
            },
          ],
          responses: {
            200: {
              description: 'Photo deleted successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: { type: 'string' },
                    },
                  },
                },
              },
            },
            404: {
              description: 'Photo not found',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                },
              },
            },
            500: {
              description: 'Internal server error',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                },
              },
            },
          },
        },
      },
      '/categories': {
        get: {
          tags: ['Categories'],
          summary: 'Get all categories',
          description: 'Retrieve all categories with optional search',
          parameters: [
            {
              name: 'search',
              in: 'query',
              description: 'Search in name and description',
              schema: { type: 'string' },
            },
          ],
          responses: {
            200: {
              description: 'Successful response',
              content: {
                'application/json': {
                  schema: {
                    allOf: [
                      { $ref: '#/components/schemas/ApiResponse' },
                      {
                        properties: {
                          data: {
                            type: 'array',
                            items: { $ref: '#/components/schemas/Category' },
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
            500: {
              description: 'Internal server error',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                },
              },
            },
          },
        },
        post: {
          tags: ['Categories'],
          summary: 'Create a new category',
          description: 'Create a new category',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    description: { type: 'string' },
                  },
                  required: ['name'],
                },
              },
            },
          },
          responses: {
            201: {
              description: 'Category created successfully',
              content: {
                'application/json': {
                  schema: {
                    allOf: [
                      { $ref: '#/components/schemas/ApiResponse' },
                      {
                        properties: {
                          data: { $ref: '#/components/schemas/Category' },
                        },
                      },
                    ],
                  },
                },
              },
            },
            400: {
              description: 'Bad request',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                },
              },
            },
            409: {
              description: 'Category already exists',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                },
              },
            },
            500: {
              description: 'Internal server error',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                },
              },
            },
          },
        },
      },
      '/categories/{id}': {
        get: {
          tags: ['Categories'],
          summary: 'Get a category by ID',
          description: 'Retrieve a single category by its ID',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: 'Category ID',
              schema: { type: 'string', format: 'uuid' },
            },
          ],
          responses: {
            200: {
              description: 'Successful response',
              content: {
                'application/json': {
                  schema: {
                    allOf: [
                      { $ref: '#/components/schemas/ApiResponse' },
                      {
                        properties: {
                          data: { $ref: '#/components/schemas/Category' },
                        },
                      },
                    ],
                  },
                },
              },
            },
            404: {
              description: 'Category not found',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                },
              },
            },
          },
        },
        put: {
          tags: ['Categories'],
          summary: 'Update a category',
          description: 'Update an existing category',
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: 'Category ID',
              schema: { type: 'string', format: 'uuid' },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    description: { type: 'string' },
                  },
                  required: ['name'],
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Category updated successfully',
              content: {
                'application/json': {
                  schema: {
                    allOf: [
                      { $ref: '#/components/schemas/ApiResponse' },
                      {
                        properties: {
                          data: { $ref: '#/components/schemas/Category' },
                        },
                      },
                    ],
                  },
                },
              },
            },
            404: {
              description: 'Category not found',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                },
              },
            },
            409: {
              description: 'Category name already exists',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                },
              },
            },
            500: {
              description: 'Internal server error',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                },
              },
            },
          },
        },
        delete: {
          tags: ['Categories'],
          summary: 'Delete a category',
          description: 'Delete an existing category',
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: 'Category ID',
              schema: { type: 'string', format: 'uuid' },
            },
          ],
          responses: {
            200: {
              description: 'Category deleted successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: { type: 'string' },
                    },
                  },
                },
              },
            },
            404: {
              description: 'Category not found',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                },
              },
            },
            409: {
              description: 'Category is being used by photos',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                },
              },
            },
            500: {
              description: 'Internal server error',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                },
              },
            },
          },
        },
      },
      '/media/upload': {
        post: {
          tags: ['Media'],
          summary: 'Upload a file',
          description: 'Upload an image file to local storage',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'multipart/form-data': {
                schema: {
                  type: 'object',
                  properties: {
                    file: {
                      type: 'string',
                      format: 'binary',
                      description: 'Image file to upload',
                    },
                  },
                  required: ['file'],
                },
              },
            },
          },
          responses: {
            201: {
              description: 'File uploaded successfully',
              content: {
                'application/json': {
                  schema: {
                    allOf: [
                      { $ref: '#/components/schemas/ApiResponse' },
                      {
                        properties: {
                          data: { $ref: '#/components/schemas/UploadResponse' },
                        },
                      },
                    ],
                  },
                },
              },
            },
            400: {
              description: 'Bad request - invalid file',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                },
              },
            },
            500: {
              description: 'Internal server error',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                },
              },
            },
          },
        },
        put: {
          tags: ['Media'],
          summary: 'Upload to Supabase Storage',
          description: 'Upload an image file to Supabase Storage',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'multipart/form-data': {
                schema: {
                  type: 'object',
                  properties: {
                    file: {
                      type: 'string',
                      format: 'binary',
                      description: 'Image file to upload',
                    },
                    bucket: {
                      type: 'string',
                      description: 'Storage bucket name',
                      default: 'photos',
                    },
                  },
                  required: ['file'],
                },
              },
            },
          },
          responses: {
            201: {
              description: 'File uploaded successfully',
              content: {
                'application/json': {
                  schema: {
                    allOf: [
                      { $ref: '#/components/schemas/ApiResponse' },
                      {
                        properties: {
                          data: {
                            allOf: [
                              { $ref: '#/components/schemas/UploadResponse' },
                              {
                                properties: {
                                  storage_path: {
                                    type: 'string',
                                    description: 'Path in Supabase Storage',
                                  },
                                },
                              },
                            ],
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
            400: {
              description: 'Bad request - invalid file',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                },
              },
            },
            500: {
              description: 'Internal server error',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                },
              },
            },
          },
        },
      },
      '/auth/login': {
        post: {
          tags: ['Authentication'],
          summary: 'Login',
          description: 'Authenticate user and get access token',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: {
                      type: 'string',
                      format: 'email',
                      description: 'User email',
                    },
                    password: {
                      type: 'string',
                      description: 'User password',
                    },
                  },
                  required: ['email', 'password'],
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Login successful',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      data: {
                        type: 'object',
                        properties: {
                          user: {
                            type: 'object',
                            properties: {
                              id: { type: 'string' },
                              email: { type: 'string' },
                              role: { type: 'string' },
                            },
                          },
                          session: {
                            type: 'object',
                            properties: {
                              access_token: { type: 'string' },
                              refresh_token: { type: 'string' },
                              expires_at: { type: 'integer' },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: 'Bad request',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                },
              },
            },
            401: {
              description: 'Invalid credentials',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                },
              },
            },
            500: {
              description: 'Internal server error',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                },
              },
            },
          },
        },
      },
      '/auth/logout': {
        post: {
          tags: ['Authentication'],
          summary: 'Logout',
          description: 'Logout user and clear session',
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: 'Logout successful',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: { type: 'string' },
                    },
                  },
                },
              },
            },
            500: {
              description: 'Internal server error',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                },
              },
            },
          },
        },
      },
      '/auth/me': {
        get: {
          tags: ['Authentication'],
          summary: 'Get current user',
          description: 'Get current authenticated user information',
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: 'User information retrieved successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      data: {
                        type: 'object',
                        properties: {
                          user: {
                            type: 'object',
                            properties: {
                              id: { type: 'string' },
                              email: { type: 'string' },
                              role: { type: 'string' },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            401: {
              description: 'Not authenticated',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                },
              },
            },
            500: {
              description: 'Internal server error',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ['./src/app/api/**/*.ts'], // Path to the API files
}

export const swaggerSpec = swaggerJSDoc(options)