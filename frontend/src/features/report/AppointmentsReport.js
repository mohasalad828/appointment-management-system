// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import DatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css' // Import styles
// import {
//   CCard,
//   CCardBody,
//   CCardHeader,
//   CFormInput,
//   CFormSelect,
//   CTable,
//   CTableBody,
//   CTableDataCell,
//   CTableHead,
//   CTableHeaderCell,
//   CTableRow,
//   CRow,
//   CCol,
// } from '@coreui/react'

// const AppointmentsReport = () => {
//   const [appointments, setAppointments] = useState([])
//   const [startDate, setStartDate] = useState(null)
//   const [endDate, setEndDate] = useState(null)
//   const [categories, setCategories] = useState([])
//   const [selectedCategory, setSelectedCategory] = useState('')
//   const [statusFilter, setStatusFilter] = useState('')
//   const [searchQuery, setSearchQuery] = useState('')

//   useEffect(() => {
//     fetchAppointments()
//     fetchCategories()
//   }, [])

//   const fetchAppointments = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/appointments/reports')
//       setAppointments(response.data.data.appointments)
//     } catch (error) {
//       console.error('Error fetching appointments:', error)
//     }
//   }

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/categories')
//       setCategories(response.data.data.categories)
//     } catch (error) {
//       console.error('Error fetching categories:', error)
//     }
//   }

//   const handleDateChange = (date, setter) => {
//     setter(date)
//   }

//   const handleFilterChange = (event) => {
//     const { name, value } = event.target
//     if (name === 'category') setSelectedCategory(value)
//     if (name === 'status') setStatusFilter(value)
//     if (name === 'search') setSearchQuery(value)
//   }

//   return (
//     <CCard>
//       <CCardHeader>
//         <strong>Appointment Reports</strong>
//       </CCardHeader>
//       <CCardBody>
//         <CRow className="mb-3">
//           <CCol md={3}>
//             <DatePicker
//               selected={startDate}
//               onChange={(date) => handleDateChange(date, setStartDate)}
//               placeholderText="Start Date"
//               className="form-control"
//             />
//           </CCol>
//           <CCol md={3}>
//             <DatePicker
//               selected={endDate}
//               onChange={(date) => handleDateChange(date, setEndDate)}
//               placeholderText="End Date"
//               className="form-control"
//             />
//           </CCol>
//           <CCol md={3}>
//             <CFormSelect name="category" value={selectedCategory} onChange={handleFilterChange}>
//               <option value="">All Categories</option>
//               {categories.map((category) => (
//                 <option key={category._id} value={category._id}>
//                   {category.name}
//                 </option>
//               ))}
//             </CFormSelect>
//           </CCol>
//           <CCol md={3}>
//             <CFormInput
//               type="text"
//               name="search"
//               placeholder="Search by username"
//               value={searchQuery}
//               onChange={handleFilterChange}
//             />
//           </CCol>
//         </CRow>
//         <CTable hover responsive>
//           <CTableHead>
//             <CTableRow>
//               <CTableHeaderCell>Username</CTableHeaderCell>
//               <CTableHeaderCell>Category</CTableHeaderCell>
//               <CTableHeaderCell>Status</CTableHeaderCell>
//               <CTableHeaderCell>Start Date</CTableHeaderCell>
//               <CTableHeaderCell>End Date</CTableHeaderCell>
//             </CTableRow>
//           </CTableHead>
//           <CTableBody>
//             {appointments
//               .filter((appointment) => {
//                 // Add filtering logic for dates, category, status, and search query
//                 return true // Replace with actual conditions based on state values
//               })
//               .map((appointment) => (
//                 <CTableRow key={appointment._id}>
//                   <CTableDataCell>{appointment.userId.fullName}</CTableDataCell>
//                   <CTableDataCell>{appointment.categoryId.name}</CTableDataCell>
//                   <CTableDataCell>{appointment.status}</CTableDataCell>
//                   <CTableDataCell>{appointment.startDate}</CTableDataCell>
//                   <CTableDataCell>{appointment.endDate}</CTableDataCell>
//                 </CTableRow>
//               ))}
//           </CTableBody>
//         </CTable>
//       </CCardBody>
//     </CCard>
//   )
// }

// export default AppointmentsReport

// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import DatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css'
// import {
//   CCard,
//   CCardBody,
//   CCardHeader,
//   CFormInput,
//   CFormSelect,
//   CTable,
//   CTableBody,
//   CTableDataCell,
//   CTableHead,
//   CTableHeaderCell,
//   CTableRow,
//   CRow,
//   CCol,
// } from '@coreui/react'

// const AppointmentsReport = () => {
//   const [appointments, setAppointments] = useState([])
//   const [startDate, setStartDate] = useState(null)
//   const [endDate, setEndDate] = useState(null)
//   const [categories, setCategories] = useState([])
//   const [selectedCategory, setSelectedCategory] = useState('')
//   const [statusFilter, setStatusFilter] = useState('')
//   const [searchQuery, setSearchQuery] = useState('')

//   useEffect(() => {
//     fetchAppointments()
//     fetchCategories()
//   }, [])

//   const fetchAppointments = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/appointments/reports')
//       setAppointments(response.data.data.appointments)
//     } catch (error) {
//       console.error('Error fetching appointments:', error)
//     }
//   }

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/categories')
//       setCategories(response.data.data.categories)
//     } catch (error) {
//       console.error('Error fetching categories:', error)
//     }
//   }

//   const handleDateChange = (date, setter) => {
//     setter(date)
//   }

//   const handleFilterChange = (event) => {
//     const { name, value } = event.target
//     if (name === 'category') setSelectedCategory(value)
//     if (name === 'status') setStatusFilter(value)
//     if (name === 'search') setSearchQuery(value)
//   }

//   // Function to format date
//   const formatDate = (date, availability) => {
//     const options = { month: '2-digit', day: '2-digit', year: 'numeric' }
//     const timeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }

//     if (availability === 'availableNow') {
//       // Format with date and time for availableNow
//       return `${new Intl.DateTimeFormat('en-US', options).format(
//         new Date(date),
//       )} ${new Date(date).toLocaleTimeString('en-US', timeOptions)}`
//     } else if (availability === 'dateRange') {
//       // Format only date for dateRange
//       return new Intl.DateTimeFormat('en-US', options).format(new Date(date))
//     }
//     return ''
//   }

//   return (
//     <CCard>
//       <CCardHeader>
//         <strong>Appointment Reports</strong>
//       </CCardHeader>
//       <CCardBody>
//         <CRow className="mb-3">
//           <CCol md={3}>
//             <DatePicker
//               selected={startDate}
//               onChange={(date) => handleDateChange(date, setStartDate)}
//               placeholderText="Start Date"
//               className="form-control"
//             />
//           </CCol>
//           <CCol md={3}>
//             <DatePicker
//               selected={endDate}
//               onChange={(date) => handleDateChange(date, setEndDate)}
//               placeholderText="End Date"
//               className="form-control"
//             />
//           </CCol>
//           <CCol md={3}>
//             <CFormSelect name="category" value={selectedCategory} onChange={handleFilterChange}>
//               <option value="">All Categories</option>
//               {categories.map((category) => (
//                 <option key={category._id} value={category._id}>
//                   {category.name}
//                 </option>
//               ))}
//             </CFormSelect>
//           </CCol>
//           <CCol md={3}>
//             <CFormInput
//               type="text"
//               name="search"
//               placeholder="Search by username"
//               value={searchQuery}
//               onChange={handleFilterChange}
//             />
//           </CCol>
//         </CRow>
//         <CTable hover responsive>
//           <CTableHead>
//             <CTableRow>
//               <CTableHeaderCell>Username</CTableHeaderCell>
//               <CTableHeaderCell>Category</CTableHeaderCell>
//               <CTableHeaderCell>Status</CTableHeaderCell>
//               <CTableHeaderCell>Start Date</CTableHeaderCell>
//               <CTableHeaderCell>End Date</CTableHeaderCell>
//             </CTableRow>
//           </CTableHead>
//           <CTableBody>
//             {appointments.map((appointment) => (
//               <CTableRow key={appointment._id}>
//                 <CTableDataCell>{appointment.userId?.fullName}</CTableDataCell>
//                 <CTableDataCell>{appointment.categoryId?.name}</CTableDataCell>
//                 <CTableDataCell>{appointment.status}</CTableDataCell>
//                 <CTableDataCell>
//                   {formatDate(appointment.startDate, appointment.availability)}
//                 </CTableDataCell>
//                 <CTableDataCell>
//                   {appointment.availability === 'dateRange'
//                     ? formatDate(appointment.endDate, appointment.availability)
//                     : '-'}
//                 </CTableDataCell>
//               </CTableRow>
//             ))}
//           </CTableBody>
//         </CTable>
//       </CCardBody>
//     </CCard>
//   )
// }

// export default AppointmentsReport
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CFormInput,
  CFormSelect,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CRow,
  CCol,
} from '@coreui/react'

const AppointmentsReport = () => {
  const [appointments, setAppointments] = useState([])
  const [filteredAppointments, setFilteredAppointments] = useState([])
  const [startDate, setStartDate] = useState(null)
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchAppointments()
    fetchCategories()
  }, [startDate, selectedCategory, statusFilter])

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/appointments/reports', {
        params: {
          startDate: startDate ? startDate.toISOString() : '',
          categoryId: selectedCategory,
          status: statusFilter,
        },
      })
      setAppointments(response.data.data.appointments)
      setFilteredAppointments(response.data.data.appointments)
    } catch (error) {
      console.error('Error fetching appointments:', error)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/categories')
      setCategories(response.data.data.categories)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const handleDateChange = (date) => {
    setStartDate(date)
  }

  const handleFilterChange = (event) => {
    const { name, value } = event.target
    if (name === 'category') setSelectedCategory(value)
    if (name === 'status') setStatusFilter(value)
    if (name === 'search') setSearchQuery(value)
  }

  // Apply frontend filtering for search query
  useEffect(() => {
    const filtered = appointments.filter((appointment) =>
      appointment.userId?.fullName.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    setFilteredAppointments(filtered)
  }, [searchQuery, appointments])

  const formatDate = (date, availability) => {
    const options = { month: '2-digit', day: '2-digit', year: 'numeric' }
    const timeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }
    return availability === 'availableNow'
      ? `${new Intl.DateTimeFormat('en-US', options).format(new Date(date))} ${new Date(
          date,
        ).toLocaleTimeString('en-US', timeOptions)}`
      : new Intl.DateTimeFormat('en-US', options).format(new Date(date))
  }

  return (
    <CCard>
      <CCardHeader>
        <strong>Appointment Reports</strong>
      </CCardHeader>
      <CCardBody>
        <CRow className="mb-3">
          <CCol md={3}>
            <DatePicker
              selected={startDate}
              onChange={handleDateChange}
              placeholderText="Start Date"
              className="form-control"
            />
          </CCol>
          <CCol md={3}>
            <CFormSelect name="category" value={selectedCategory} onChange={handleFilterChange}>
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </CFormSelect>
          </CCol>
          <CCol md={3}>
            <CFormSelect name="status" value={statusFilter} onChange={handleFilterChange}>
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Process">Process</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Completed">Completed</option>
            </CFormSelect>
          </CCol>
          <CCol md={3}>
            <CFormInput
              type="text"
              name="search"
              placeholder="Search by username"
              value={searchQuery}
              onChange={handleFilterChange}
            />
          </CCol>
        </CRow>
        <CTable hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>Username</CTableHeaderCell>
              <CTableHeaderCell>Appointment Title</CTableHeaderCell>
              <CTableHeaderCell>Category</CTableHeaderCell>
              <CTableHeaderCell>Status</CTableHeaderCell>
              <CTableHeaderCell>Appointment Date</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {filteredAppointments.map((appointment) => (
              <CTableRow key={appointment._id}>
                <CTableDataCell>{appointment.userId?.fullName}</CTableDataCell>
                <CTableDataCell>{appointment.title}</CTableDataCell>
                <CTableDataCell>{appointment.categoryId?.name}</CTableDataCell>
                <CTableDataCell>{appointment.status}</CTableDataCell>
                <CTableDataCell>
                  {formatDate(appointment.startDate, appointment.availability)}
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  )
}

export default AppointmentsReport
