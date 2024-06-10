import type { Application } from 'express'
import express from 'express'

export async function serverConfig(app: Application): Promise<void> {
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  app.set('etag', false)
  app.use((req, res, next) => {
    res.set('cache-control', 'no-store')
    next()
  })
  app.use(express.static('src/app'))
}
