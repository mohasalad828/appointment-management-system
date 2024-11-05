import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'

const UserDashboard = () => {
  const [stats, setStats] = useState({
    totalAppointments: 0,
    Pending: 0,
    Approved: 0,
    Cancelled: 0,
    'In-Progress': 0,
  })

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get('/api/dashboard/user-stats', {
          headers: { Authorization: `Bearer ${token}` },
        })
        setStats(response.data.data)
      } catch (error) {
        console.error('Error fetching user stats:', error)
      }
    }

    fetchUserStats()
  }, [])

  return (
    <CRow>
      <CCol xs={12} md={6} lg={3}>
        <CCard className="text-center mb-4">
          <CCardHeader>Total Appointments</CCardHeader>
          <CCardBody>
            <h5>{stats.totalAppointments}</h5>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12} md={6} lg={3}>
        <CCard className="text-center mb-4">
          <CCardHeader>Pending</CCardHeader>
          <CCardBody>
            <h5>{stats.Pending}</h5>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12} md={6} lg={3}>
        <CCard className="text-center mb-4">
          <CCardHeader>Approved</CCardHeader>
          <CCardBody>
            <h5>{stats.Approved}</h5>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12} md={6} lg={3}>
        <CCard className="text-center mb-4">
          <CCardHeader>Cancelled</CCardHeader>
          <CCardBody>
            <h5>{stats.Cancelled}</h5>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12} md={6} lg={3}>
        <CCard className="text-center mb-4">
          <CCardHeader>In Progress</CCardHeader>
          <CCardBody>
            <h5>{stats['In-Progress']}</h5>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default UserDashboard
