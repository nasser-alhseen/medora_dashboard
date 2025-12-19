import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const messages = {
  ar: {
    welcome: 'أهلاً بعودتك',
    subtitle: 'تسجيل الدخول إلى لوحة التحكم',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    forgot: 'نسيت كلمة المرور؟',
    login: 'تسجيل الدخول',
    loggingIn: 'جاري التسجيل...',
    logout: 'تسجيل الخروج',
    helloMedora: 'مرحبا بك في مدورا',
    simpleAfter: 'هذه صفحة بسيطة بعد تسجيل الدخول.',
  },
  en: {
    welcome: 'Welcome back',
    subtitle: 'Sign in to the dashboard',
    email: 'Email',
    password: 'Password',
    forgot: 'Forgot password?',
    login: 'Sign In',
    loggingIn: 'Signing in...',
    logout: 'Logout',
    helloMedora: 'Welcome to Medora',
    simpleAfter: 'This is a simple page after login.',
  },
}

const LocaleContext = createContext(null)

export default function LocaleProvider({ children }) {
  const [locale, setLocale] = useState(() => localStorage.getItem('medora_locale') || 'ar')
  useEffect(() => {
    localStorage.setItem('medora_locale', locale)
  }, [locale])
  const dir = locale === 'ar' ? 'rtl' : 'ltr'
  const t = (key) => messages[locale]?.[key] ?? key
  const toggle = () => setLocale((l) => (l === 'ar' ? 'en' : 'ar'))
  const value = useMemo(() => ({ locale, setLocale, dir, t, toggle }), [locale, dir])
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useI18n() {
  return useContext(LocaleContext)
}
