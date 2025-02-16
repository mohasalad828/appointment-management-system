import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilCalendar, cilClipboard, cilFolderOpen, cilPeople, cilSpeedometer } from '@coreui/icons' // Import cilSpeedometer
import { CNavItem, CNavTitle, CNavGroup } from '@coreui/react'

const _nav = [
  {
    component: CNavTitle,
    name: 'Management',
  },
  {
    component: CNavItem,
    name: 'Dashboard', // New dashboard item
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />, // Add the icon for dashboard
    badge: {
      color: 'info',
      // text: 'NEW', // Badge text and color
    },
  },
  {
    component: CNavItem,
    name: 'Categories',
    to: '/categories',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Appointments',
    to: '/appointments',
    icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Admin',
    to: '/users',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Reports',
    icon: <CIcon icon={cilFolderOpen} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Appointment Reports',
        to: '/reports/appointments',
        icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
      },
    ],
  },
]

export default _nav
