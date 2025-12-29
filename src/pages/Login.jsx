import { useState } from 'react'
import cover from '../assets/login_cover.jpg'
import { useI18n } from '../context/LocaleProvider.jsx'
import useAuth from '../hooks/useAuth'
import './login.css'

export default function Login() {
  const { login } = useAuth()
  const { t, dir } = useI18n()
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
          <h1>{t('welcome')}</h1>
          <p className="subtitle">{t('subtitle')}</p>
          <form onSubmit={onSubmit} className="login-form" dir={dir}>
            <label className="field">
              <span>{t('email')}</span>
              <input
                type="email"
                placeholder={t('email')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="username"
              />
            </label>
            <label className="field">
              <span>{t('password')}</span>
              <input
                type="password"
                placeholder={t('password')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </label>
            <div className="forgot">
              <a href="#" onClick={(e) => e.preventDefault()}>
                {t('forgot')}
              </a>
            </div>
            {error && <div className="error">{error}</div>}
            <button className="submit" type="submit" disabled={submitting}>
              {submitting ? t('loggingIn') : t('login')}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
