import './App.css'
import useAuth from './hooks/useAuth.js'
import Dashboard from './pages/Dashboard.jsx'
import Login from './pages/Login.jsx'

function App() {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <Dashboard /> : <Login />
}

export default App
