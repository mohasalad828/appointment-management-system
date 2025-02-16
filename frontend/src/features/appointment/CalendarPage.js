import React from 'react'
import Calendar from 'react-calendar'
import { useLocation } from 'react-router-dom'
import 'react-calendar/dist/Calendar.css'
import './CalendarPage.css'

const CalendarPage = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const appointmentDate = new Date(queryParams.get('appointmentDate'))
  const categoryColor = queryParams.get('categoryColor') || '#3498db'

  return (
    <div className="calendar-container" style={{ '--category-color': categoryColor }}>
      <div className="calendar-box">
        <h2>Your Appointment</h2>
        <Calendar value={appointmentDate} />
      </div>
    </div>
  )
}

export default CalendarPage