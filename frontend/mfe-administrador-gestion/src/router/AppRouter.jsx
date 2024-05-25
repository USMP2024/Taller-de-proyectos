import React from 'react'
import { RouterProvider } from 'react-router-dom'
import route from './router'

export const AppRouter = () => {
  return (
    <RouterProvider  router={route}/>
  )
}
