import { useEffect, useState } from 'react'
import { useI18n } from '../context/LocaleProvider.jsx'
import { useTheme } from '../context/ThemeProvider.jsx'
import useAuth from '../hooks/useAuth'
import './navbar.css'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { theme, toggle: toggleTheme } = useTheme()
  const { t, toggle: toggleLocale, dir, locale } = useI18n()
  const [drawerOpen, setDrawerOpen] = useState(false)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setDrawerOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])
  const initials =
    user?.name
      ?.split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('') || '?'
  return (
    <header className="navbar" dir={dir}>
      <div className="nav-left"></div>
      <div className="nav-right">
        <button className="toggle theme" onClick={toggleTheme} aria-label="toggle theme">
          {theme === 'dark' ? '☀︎' : '☾'}
        </button>
        <button className="toggle locale" onClick={toggleLocale} aria-label="toggle language">
          {locale === 'ar' ? 'EN' : 'ع'}
        </button>
        <span className="user-name">{user?.name}</span>
        <div
          className="avatar"
          title={user?.email}
          onClick={() => setDrawerOpen((v) => !v)}
          aria-haspopup="true"
          aria-expanded={drawerOpen ? 'true' : 'false'}
        >
          {initials}
        </div>
      </div>
      {drawerOpen && <div className="drawer-overlay" onClick={() => setDrawerOpen(false)} />}
      <aside className={`drawer ${drawerOpen ? 'open' : ''}`} aria-hidden={!drawerOpen}>
        <div className="drawer-header">
          <div className="drawer-avatar">{initials}</div>
          <div className="drawer-info">
            <div className="drawer-name">{user?.name}</div>
            <div className="drawer-email">{user?.email}</div>
          </div>
        </div>
        <nav className="drawer-list">
          <button className="drawer-item" onClick={logout}>
            {t('logout')}
          </button>
        </nav>
      </aside>
    </header>
  )
}
