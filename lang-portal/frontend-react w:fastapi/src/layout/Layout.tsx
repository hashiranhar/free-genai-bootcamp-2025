import { Link, useLocation } from 'react-router-dom';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();

  const links = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/study_activities', label: 'Activities' },
    { to: '/words', label: 'Words' },
    { to: '/groups', label: 'Groups' },
    { to: '/study_sessions', label: 'Sessions' },
    { to: '/settings', label: 'Settings' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-indigo-600 text-white px-6 py-4 shadow">
        <nav className="flex items-center gap-6">
          <span className="font-bold text-xl">📘 Study Portal</span>
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`hover:underline ${pathname === to ? 'font-semibold underline' : ''}`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="text-center text-xs text-gray-500 p-4">
        © {new Date().getFullYear()} Study Portal
      </footer>
    </div>
  );
}
