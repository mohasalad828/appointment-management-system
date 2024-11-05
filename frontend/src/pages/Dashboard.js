import React, { useEffect, useState } from 'react'
import {
  CAvatar,
  CCard,
  CCardBody,
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
import { cilPeople } from '@coreui/icons'
import WidgetsDropdown from '../views/widgets/WidgetsDropdown'

const Dashboard = () => {
  const [topUsers, setTopUsers] = useState([])

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/dashboard/most-appointment-user', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        const data = await response.json()
        setTopUsers(data.data.appointmentsCount)
      } catch (error) {
        console.error('Error fetching top users:', error)
      }
    }

    fetchTopUsers()
  }, [])

  return (
    <>
      <WidgetsDropdown className="mb-4" />

      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">User</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Phone</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Appointments</CTableHeaderCell>
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
