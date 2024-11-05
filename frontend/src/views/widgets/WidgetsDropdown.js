import React, { useEffect, useState } from 'react'
import { CRow, CCol, CWidgetStatsA } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowTop, cilArrowBottom, cilOptions } from '@coreui/icons'

const WidgetsDropdown = ({ className }) => {
  const [stats, setStats] = useState({
    totalAppointments: 0,
    Pending: 0,
    Approved: 0,
    Cancelled: 0,
    'In-Progress': 0,
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/dashboard/appointments-summary', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        const data = await response.json()
        setStats(data.data)
      } catch (error) {
        console.error('Error fetching stats:', error)
      }
    }

    fetchStats()
  }, [])

  return (
    <CRow className={className} xs={{ gutter: 4 }}>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="primary"
          value={<>{stats.totalAppointments}</>}
          title="Total Appointments"
          action={<CIcon icon={cilOptions} />}
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="info"
          value={<>{stats.Completed}</>}
          title="Completed Appointments"
          action={<CIcon icon={cilArrowTop} />}
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="warning"
          value={<>{stats['Process']}</>}
          title="In-Progress Appointments"
          action={<CIcon icon={cilArrowTop} />}
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="danger"
          value={<>{stats.Cancelled}</>}
          title="Cancelled Appointments"
          action={<CIcon icon={cilArrowBottom} />}
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="secondary"
          value={<>{stats.Pending}</>}
          title="Pending Appointments"
          action={<CIcon icon={cilArrowBottom} />}
        />
      </CCol>
    </CRow>
  )
}

export default WidgetsDropdown
