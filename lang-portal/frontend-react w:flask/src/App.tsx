import { ThemeProvider } from "@/components/theme-provider"
import { BrowserRouter as Router } from 'react-router-dom'
import TopRibbon from '@/components/TopRibbon'
import Breadcrumbs from '@/components/Breadcrumbs'
import AppRouter from '@/components/AppRouter'
import { NavigationProvider } from '@/context/NavigationContext'

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <NavigationProvider>
        <Router>
          <TopRibbon />
          <div className="container mx-auto mt-16 px-4">
            <Breadcrumbs />
            <AppRouter />
          </div>
        </Router>
      </NavigationProvider>
    </ThemeProvider>
  )
}