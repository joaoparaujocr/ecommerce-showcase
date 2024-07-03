import Navbar from './Navbar'
import Footer from './Footer'
import { ReactNode } from 'react'
import Stack from '@mui/material/Stack'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Stack sx={{ minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        {children}
      </main>
      <Footer />
    </Stack>
  )
}