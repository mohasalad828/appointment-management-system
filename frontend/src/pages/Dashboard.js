import React, { useEffect, useState } from 'react'
import {
  CAvatar,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import WidgetsDropdown from '../views/widgets/WidgetsDropdown'
import { CChartPie } from '@coreui/react-chartjs'
import { cilPeople } from '@coreui/icons'

const Dashboard = () => {
  const [topUsers, setTopUsers] = useState([])
  const [appointmentStats, setAppointmentStats] = useState({})
  const [categoryStats, setCategoryStats] = useState([])

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetching top users data
        const topUsersResponse = await fetch('http://localhost:5000/api/dashboard/most-appointment-user', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        const topUsersData = await topUsersResponse.json()
        setTopUsers(topUsersData.data.appointmentsCount)

        // Fetching appointment statistics
        const appointmentStatsResponse = await fetch('http://localhost:5000/api/dashboard/appointments-summary', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        const appointmentStatsData = await appointmentStatsResponse.json()
        setAppointmentStats(appointmentStatsData.data)

        // Fetching category statistics
        const categoryStatsResponse = await fetch('http://localhost:5000/api/dashboard/category-summary', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        const categoryStatsData = await categoryStatsResponse.json()
        console.log("Category Stats:", categoryStatsData.data)
        setCategoryStats(categoryStatsData.data)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      }
    }

    fetchDashboardData()
  }, [])

  return (
    <>
      <WidgetsDropdown className="mb-4" />

      <CRow>
        <CCol xs={12} md={6}>
          <CCard className="mb-4">
            <CCardHeader>Appointment Status Distribution</CCardHeader>
            <CCardBody>
              <CChartPie
                data={{
                  labels: ['Pending', 'Completed', 'Cancelled', 'Process'],
                  datasets: [
                    {
                      data: [
                        appointmentStats.Pending || 0,
                        appointmentStats.Completed || 0,
                        appointmentStats.Cancelled || 0,
                        appointmentStats.Process || 0,
                      ],
                      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                    },
                  ],
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={12} md={6}>
          <CCard className="mb-4">
            <CCardHeader>Categories Distribution</CCardHeader>
            <CCardBody>
              <CChartPie
                data={{
                  labels: categoryStats.length ? categoryStats.map((category) => category.name) : ['No Data'],
                  datasets: [
                    {
                      data: categoryStats.length ? categoryStats.map((category) => category.count) : [1],
                      backgroundColor: categoryStats.length
                        ? categoryStats.map((_, index) => `hsl(${(index * 360) / categoryStats.length}, 70%, 60%)`)
                        : ['#ccc'],
                    },
                  ],
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardBody>
              <h5>Top 10 Users with Most Appointments</h5>
              <CTable hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell className="text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell>
                    <CTableHeaderCell>User</CTableHeaderCell>
                    <CTableHeaderCell>Phone</CTableHeaderCell>
                    <CTableHeaderCell>Appointments</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {topUsers.map((user, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell className="text-center">
                        <CAvatar size="md" status="success" />
                      </CTableDataCell>
                      <CTableDataCell>{user.name}</CTableDataCell>
                      <CTableDataCell>{user.phone}</CTableDataCell>
                      <CTableDataCell>{user.totalAppointments}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
