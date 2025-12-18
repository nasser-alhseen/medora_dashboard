import useAuth from '../hooks/useAuth'
import './navbar.css'

export default function Navbar() {
  const { user, logout } = useAuth()
  const initials =
    user?.name
      ?.split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('') || '?'
  return (
    <header className="navbar" dir="rtl">
      <div className="nav-left"></div>
      <div className="nav-right">
        <span className="user-name">{user?.name}</span>
        <div className="avatar" title={user?.email} onClick={logout}>
          {initials}
        </div>
      </div>
    </header>
  )
}
