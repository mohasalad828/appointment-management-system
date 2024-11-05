import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import 'react-calendar/dist/Calendar.css'
import './CalendarPage.css'

const CalendarPage = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const appointmentDate = new Date(queryParams.get('appointmentDate'))
  const categoryId = queryParams.get('categoryId')

  const [categoryColor, setCategoryColor] = useState('#3498db') // Default color for highlight

  useEffect(() => {
    // Fetch the category color from the backend
    const fetchCategoryColor = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/categories/${categoryId}`)
        setCategoryColor(response.data.color) // Set the fetched color
      } catch (error) {
        console.error('Error fetching category color:', error)
      }
    }

    if (categoryId) {
      fetchCategoryColor()
    }
  }, [categoryId])

  return (
    <div className="calendar-page">
      <div className="calendar-container">
        <h2>Your Appointment</h2>
        <Calendar
          value={appointmentDate}
          tileClassName={({ date, view }) =>
            view === 'month' && date.toDateString() === appointmentDate.toDateString()
              ? 'highlighted-date'
              : null
          }
        />
      </div>
    </div>
  )
}

export default CalendarPage
