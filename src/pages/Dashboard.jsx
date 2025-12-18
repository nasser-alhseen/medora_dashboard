import Navbar from '../components/Navbar'

export default function Dashboard() {
  return (
    <div className="dashboard" style={{ minHeight: '100vh', background: '#f6f7fb' }}>
      <Navbar />
      <div style={{ padding: '24px' }}>
        <h2 style={{ marginTop: 0 }} dir="rtl">مرحبا بك في مدورا</h2>
        <p dir="rtl">هذه صفحة بسيطة بعد تسجيل الدخول.</p>
      </div>
    </div>
  )
}
