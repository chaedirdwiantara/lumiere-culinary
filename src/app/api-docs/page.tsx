'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'

// Dynamically import SwaggerUI to avoid SSR issues
const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false })

export default function ApiDocsPage() {
  const [spec, setSpec] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSpec = async () => {
      try {
        const response = await fetch('/api/swagger.json')
        if (!response.ok) {
          throw new Error('Failed to fetch API specification')
        }
        const data = await response.json()
        setSpec(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchSpec()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-foreground-muted">Loading API Documentation...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <h1 className="text-xl font-semibold text-foreground mb-2">Error Loading API Docs</h1>
          <p className="text-foreground-muted">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-secondary border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold gradient-text">
                Lumiere API Documentation
              </h1>
              <p className="text-foreground-muted mt-2">
                Complete API reference for the Lumiere Culinary Portfolio platform
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="/"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Back to App
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Swagger UI Container */}
      <div className="swagger-container">
        {spec && (
          <SwaggerUI
            spec={spec}
            docExpansion="list"
            defaultModelsExpandDepth={2}
            defaultModelExpandDepth={2}
            displayRequestDuration={true}
            tryItOutEnabled={true}
            filter={true}
            showExtensions={true}
            showCommonExtensions={true}
            deepLinking={true}
            displayOperationId={false}
            requestInterceptor={(request) => {
              // Add any request interceptors here
              return request
            }}
            responseInterceptor={(response) => {
              // Add any response interceptors here
              return response
            }}
          />
        )}
      </div>

      {/* Custom Swagger Styles */}
      <style jsx global>{`
        .swagger-container {
          background: #0a0a0a;
          min-height: calc(100vh - 120px);
        }

        /* Dark theme for Swagger UI */
        .swagger-ui {
          background: #0a0a0a !important;
          color: #ffffff !important;
        }

        .swagger-ui .topbar {
          background: #1a1a1a !important;
          border-bottom: 1px solid #333333 !important;
        }

        .swagger-ui .info {
          background: #1a1a1a !important;
          border: 1px solid #333333 !important;
          border-radius: 8px !important;
          margin: 20px !important;
          padding: 20px !important;
        }

        .swagger-ui .info .title {
          color: #d4af37 !important;
        }

        .swagger-ui .info .description {
          color: #e5e5e5 !important;
        }

        .swagger-ui .scheme-container {
          background: #1a1a1a !important;
          border: 1px solid #333333 !important;
          border-radius: 8px !important;
          margin: 20px !important;
          padding: 15px !important;
        }

        .swagger-ui .opblock {
          background: #1a1a1a !important;
          border: 1px solid #333333 !important;
          border-radius: 8px !important;
          margin-bottom: 15px !important;
        }

        .swagger-ui .opblock .opblock-summary {
          border-bottom: 1px solid #333333 !important;
        }

        .swagger-ui .opblock .opblock-summary-method {
          background: #d4af37 !important;
          color: #0a0a0a !important;
          font-weight: bold !important;
        }

        .swagger-ui .opblock .opblock-summary-path {
          color: #ffffff !important;
        }

        .swagger-ui .opblock .opblock-summary-description {
          color: #e5e5e5 !important;
        }

        .swagger-ui .opblock.opblock-get .opblock-summary-method {
          background: #10b981 !important;
        }

        .swagger-ui .opblock.opblock-post .opblock-summary-method {
          background: #3b82f6 !important;
        }

        .swagger-ui .opblock.opblock-put .opblock-summary-method {
          background: #f59e0b !important;
        }

        .swagger-ui .opblock.opblock-delete .opblock-summary-method {
          background: #ef4444 !important;
        }

        .swagger-ui .parameters-container {
          background: #2a2a2a !important;
          border-radius: 6px !important;
          padding: 15px !important;
        }

        .swagger-ui .parameter__name {
          color: #d4af37 !important;
        }

        .swagger-ui .parameter__type {
          color: #10b981 !important;
        }

        .swagger-ui .response-col_status {
          color: #d4af37 !important;
        }

        .swagger-ui .response-col_description {
          color: #e5e5e5 !important;
        }

        .swagger-ui .btn {
          background: #d4af37 !important;
          color: #0a0a0a !important;
          border: none !important;
          border-radius: 6px !important;
          font-weight: 500 !important;
        }

        .swagger-ui .btn:hover {
          background: #b8941f !important;
        }

        .swagger-ui .btn.cancel {
          background: #6b7280 !important;
          color: #ffffff !important;
        }

        .swagger-ui .btn.cancel:hover {
          background: #4b5563 !important;
        }

        .swagger-ui input[type="text"],
        .swagger-ui input[type="password"],
        .swagger-ui input[type="email"],
        .swagger-ui textarea,
        .swagger-ui select {
          background: #2a2a2a !important;
          border: 1px solid #333333 !important;
          color: #ffffff !important;
          border-radius: 6px !important;
        }

        .swagger-ui input[type="text"]:focus,
        .swagger-ui input[type="password"]:focus,
        .swagger-ui input[type="email"]:focus,
        .swagger-ui textarea:focus,
        .swagger-ui select:focus {
          border-color: #d4af37 !important;
          box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.2) !important;
        }

        .swagger-ui .model-box {
          background: #1a1a1a !important;
          border: 1px solid #333333 !important;
          border-radius: 6px !important;
        }

        .swagger-ui .model .property {
          color: #e5e5e5 !important;
        }

        .swagger-ui .model .property.primitive {
          color: #10b981 !important;
        }

        .swagger-ui .model-title {
          color: #d4af37 !important;
        }

        .swagger-ui .loading-container {
          background: #0a0a0a !important;
        }

        .swagger-ui .filter-container {
          background: #1a1a1a !important;
          border-bottom: 1px solid #333333 !important;
          padding: 15px 20px !important;
        }

        .swagger-ui .filter input {
          background: #2a2a2a !important;
          border: 1px solid #333333 !important;
          color: #ffffff !important;
          border-radius: 6px !important;
          padding: 8px 12px !important;
        }

        .swagger-ui .filter input:focus {
          border-color: #d4af37 !important;
          box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.2) !important;
        }
      `}</style>
    </div>
  )
}