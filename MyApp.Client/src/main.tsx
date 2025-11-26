import { StrictMode, forwardRef } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link, type LinkProps } from 'react-router-dom'
import { ClientContext, setLinkComponent } from "@servicestack/react"
import './styles/index.css'
import App from './App.tsx'
import Profile from './profile.tsx'
import Forbidden from './forbidden.tsx'
import { init, client, isServerRoute } from './lib/gateway.ts'

// Custom Link that forces full page redirect for /Identity paths
const AppLink = forwardRef<HTMLAnchorElement, LinkProps>(({ to, ...props }, ref) => {
  const path = typeof to === 'string' ? to : to.pathname ?? ''
  if (isServerRoute(path)) {
    return <a ref={ref} href={path} {...props} />
  }
  return <Link ref={ref} to={to} {...props} />
})

// Configure the library to use our custom Link component
setLinkComponent(AppLink)
init().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <BrowserRouter>
        <ClientContext.Provider value={client}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/forbidden" element={<Forbidden />} />
            <Route path="*" element={<App />} />
          </Routes>
        </ClientContext.Provider>
      </BrowserRouter>
    </StrictMode>,
  )
})
