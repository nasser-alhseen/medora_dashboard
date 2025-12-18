import { useState } from 'react'
import cover from '../assets/login_cover.jpg'
import useAuth from '../hooks/useAuth'
import './login.css'

export default function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await login(email.trim(), password)
    } catch {
      setError('فشل تسجيل الدخول. تحقق من البيانات.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-left">
        <img src={cover} alt="" />
      </div>
      <div className="login-right">
        <div className="login-card">
          <h1>أهلاً بعودتك</h1>
          <p className="subtitle">تسجيل الدخول إلى لوحة التحكم</p>
          <form onSubmit={onSubmit} className="login-form" dir="rtl">
            <label className="field">
              <span>البريد الإلكتروني</span>
              <input
                type="email"
                placeholder="البريد الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="username"
              />
            </label>
            <label className="field">
              <span>كلمة المرور</span>
              <input
                type="password"
                placeholder="كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </label>
            <div className="forgot">
              <a href="#" onClick={(e) => e.preventDefault()}>
                نسيت كلمة المرور؟
              </a>
            </div>
            {error && <div className="error">{error}</div>}
            <button className="submit" type="submit" disabled={submitting}>
              {submitting ? 'جاري التسجيل...' : 'تسجيل الدخول'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
