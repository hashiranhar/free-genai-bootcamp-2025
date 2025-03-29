import * as React from "react"
import { useLocation, Link } from "react-router-dom"
import { WholeWord, Group, Home, Hourglass, BookOpenText, Settings, ChevronDown } from "lucide-react"

const navItems = [
  { icon: Home, name: 'Dashboard', path: '/dashboard' },
  { icon: BookOpenText, name: 'Study Activities', path: '/study-activities' },
  { icon: WholeWord, name: 'Words', path: '/words' },
  { icon: Group, name: 'Word Groups', path: '/groups' },
  { icon: Settings, name: 'Settings', path: '/settings' },
]

const sessionItems = [
  { name: 'Active Sessions', path: '/sessions/active' },
  { name: 'Completed Sessions', path: '/sessions/completed' },
]

export default function TopRibbon() {
  const location = useLocation()

  const isActive = (path: string) => {
    if (path === '/dashboard' && location.pathname === '/') return true
    return location.pathname.startsWith(path)
  }

  return (
    <div className="bg-purple-700 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <div className="text-lg font-bold">LangPortal</div>
        <nav className="flex items-center space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md ${
                isActive(item.path) ? "bg-purple-900" : "hover:bg-purple-800"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          ))}
          <div className="relative group">
            <button className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-purple-800">
              <Hourglass className="w-5 h-5" />
              <span>Sessions</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute left-0 mt-2 hidden w-48 bg-white text-gray-800 rounded-md shadow-lg group-hover:block group-focus-within:block">
              {sessionItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}
