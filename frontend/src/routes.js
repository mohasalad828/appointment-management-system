// routes.js
import React from 'react'

const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const UserDashboard = React.lazy(() => import('./pages/UserDashboard'))
const Spinners = React.lazy(() => import('./ui/spinners/Spinners'))
const Appointment = React.lazy(() => import('./features/appointment/Appointments'))
const Users = React.lazy(() => import('./features/user/Users')) // Import Users component
const Category = React.lazy(() => import('./features/category/Categories'))
// const CalendarView = React.lazy(() => import('./features/appointment/CalendarView'))
const CalendarPage = React.lazy(() => import('./features/appointment/CalendarPage'))
const AppointmentsReport = React.lazy(() => import('./features/report/AppointmentsReport'))

// import CalendarPage from './features/appointment/CalendarPage' // New route for CalendarView

// // Function to determine the dashboard based on role
// const getDashboardByRole = () => {
//   const userRole = localStorage.getItem('role')
//   return userRole === 'Admin' ? AdminDashboard : UserDashboard
// }

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  // { path: '/dashboard', name: 'Dashboard', element: getDashboardByRole() },
  { path: '/categories', name: 'Categories', element: Category },
  { path: '/appointments', name: 'Appointments', element: Appointment },
  { path: '/users', name: 'Users', element: Users }, // Add Users route here
  // { path: '/calendar-view', name: 'Calendar View', element: CalendarView },
  { path: '/calendar', name: 'Calendar', element: CalendarPage },
  { path: '/reports/appointments', name: 'Appointment Reports', element: AppointmentsReport },
]

export default routes
