import Navbar from '../components/Navbar'
import { useI18n } from '../context/LocaleProvider.jsx'

export default function Dashboard() {
  const { t, dir } = useI18n()
  return (
    <div className="dashboard" style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Navbar />
      <div style={{ padding: '24px' }} dir={dir}>
        <h2 style={{ marginTop: 0, color: 'var(--text)' }}>{t('helloMedora')}</h2>
        <p style={{ color: 'var(--muted)' }}>{t('simpleAfter')}</p>
      </div>
    </div>
  )
}
