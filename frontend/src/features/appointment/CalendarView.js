// import React, { useEffect, useState } from 'react'
// import { useLocation } from 'react-router-dom'
// import Calendar from 'react-calendar'
// import 'react-calendar/dist/Calendar.css'
// import axios from 'axios'

// const CalendarView = () => {
//   const location = useLocation()
//   const queryParams = new URLSearchParams(location.search)
//   const appointmentId = queryParams.get('appointmentId')
//   const categoryColor = queryParams.get('categoryColor')

//   const [appointment, setAppointment] = useState(null)
//   const [highlightedDates, setHighlightedDates] = useState([])

//   useEffect(() => {
//     fetchAppointment()
//   }, [appointmentId])

//   const fetchAppointment = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/appointments/${appointmentId}`)
//       setAppointment(response.data)
//       setHighlightedDates([new Date(response.data.startDate)]) // Highlight start date
//     } catch (error) {
//       console.error('Error fetching appointment details:', error)
//     }
//   }

//   const tileContent = ({ date, view }) => {
//     if (
//       view === 'month' &&
//       highlightedDates.some((d) => d.toDateString() === date.toDateString())
//     ) {
//       return (
//         <div
//           style={{
//             backgroundColor: categoryColor,
//             color: 'white',
//             borderRadius: '5px',
//             padding: '5px',
//           }}
//         >
//           {appointment?.title}
//         </div>
//       )
//     }
//   }

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>Calendar View for Appointment</h2>
//       {appointment && (
//         <Calendar
//           tileContent={tileContent}
//           defaultActiveStartDate={new Date(appointment.startDate)}
//         />
//       )}
//     </div>
//   )
// }

// export default CalendarView
import React from 'react'
import Calendar from 'react-calendar'
import { useLocation } from 'react-router-dom'

const CalendarView = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const appointmentDate = new Date(queryParams.get('appointmentDate')) // Get date from URL

  return (
    <div style={{ padding: '20px' }}>
      <h2>Appointment Calendar</h2>
      <Calendar
        value={appointmentDate} // Set calendar to start with the appointment date
      />
    </div>
  )
}

export default CalendarView
