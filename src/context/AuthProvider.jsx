import { useMemo, useState } from 'react'
import client from '../api/client'
import AuthContext from './AuthContext'

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('medora_token'))
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('medora_user')
    return stored ? JSON.parse(stored) : null
  })

  const login = async (email, password) => {
    const res = await client.post('/api/login', { email, password })
    const payload = res.data
    const authToken = payload?.data?.authorisation?.token
    const authUser = payload?.data?.user
    if (authToken && authUser) {
      localStorage.setItem('medora_token', authToken)
      localStorage.setItem('medora_user', JSON.stringify(authUser))
      setToken(authToken)
      setUser(authUser)
      return { user: authUser, token: authToken }
    }
    throw new Error('Invalid login response')
  }

  const logout = () => {
    localStorage.removeItem('medora_token')
    localStorage.removeItem('medora_user')
    setToken(null)
    setUser(null)
  }

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: !!user && !!token,
      login,
      logout,
    }),
    [user, token],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
