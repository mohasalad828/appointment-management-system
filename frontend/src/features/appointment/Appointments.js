import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CCol,
  CRow,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CForm,
  CFormInput,
  CFormSelect,
  CFormCheck,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash, cilPlus, cilCalendar } from '@coreui/icons'

const Appointments = ({ userId }) => {
  const [appointments, setAppointments] = useState([])

  const [filteredAppointments, setFilteredAppointments] = useState([])

  const [categories, setCategories] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  // const [form, setForm] = useState({
  //   title: '',
  //   categoryId: '',
  //   duration: 15,
  //   availability: 'availableNow',
  //   startDate: '',
  //   endDate: '',
  //   availableNowTime: '',
  //   status: 'Pending',
  //   userId,
  // })
  const [form, setForm] = useState({
    title: '',
    categoryId: '',
    duration: 15, // Default duration
    availability: 'availableNow', // Default availability
    startDate: '',
    endDate: '',
    availableNowTime: '',
    status: 'Pending',
  })

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [appointmentToDelete, setAppointmentToDelete] = useState(null)

  useEffect(() => {
    fetchAppointments()
    fetchCategories()
  }, [])

  const token = localStorage.getItem('token') // get token from localStorage

  useEffect(() => {
    if (Array.isArray(appointments)) {
      setFilteredAppointments(
        appointments.filter(
          (appointment) =>
            appointment.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (appointment.categoryId?.name &&
              appointment.categoryId.name.toLowerCase().includes(searchQuery.toLowerCase())),
        ),
      )
    }
  }, [searchQuery, appointments])

  const fetchAppointments = async () => {
    const token = localStorage.getItem('token') // Retrieve the token from localStorage
    if (!token) {
      console.error('No token found. Please log in.')
      return
    }

    try {
      const response = await axios.get('http://localhost:5000/api/appointments', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = Array.isArray(response.data.data.appointments)
        ? response.data.data.appointments
        : []
      setAppointments(data)
      setFilteredAppointments(data)
    } catch (error) {
      console.error('Error fetching appointments:', error.response?.data || error.message)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/categories')
      setCategories(response.data.data.categories)
    } catch (error) {
      console.error('Error fetching categories:', error.response?.data || error.message)
    }
  }

  const toggleAddModal = () => {
    setShowAddModal(!showAddModal)
    resetForm()
    setIsEdit(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  // const handleAddAppointment = async () => {
  //   const token = localStorage.getItem('token')
  //   try {
  //     const formData = { ...form, userId: localStorage.getItem('userId') }

  //     if (form.availability === 'availableNow') {
  //       formData.startDate = new Date() // Set to current date
  //       formData.startDate.setHours(...form.availableNowTime.split(':')) // Set the selected time
  //       formData.endDate = null // Ensure endDate is explicitly set to null
  //     } else if (form.availability === 'dateRange') {
  //       formData.startDate = new Date(form.startDate) // Start date from the form
  //       formData.endDate = new Date(form.endDate) // End date from the form
  //     }

  //     const response = await axios.post('http://localhost:5000/api/appointments', formData, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })

  //     setAppointments([...appointments, response.data])
  //     setShowAddModal(false)
  //     fetchAppointments()
  //   } catch (error) {
  //     console.error('Error adding appointment:', error.response?.data || error.message)
  //   }
  // }

  const handleAddAppointment = async () => {
    const token = localStorage.getItem('token')
    try {
      const formData = { ...form }

      if (form.availability === 'availableNow') {
        formData.startDate = new Date()
        formData.startDate.setHours(...form.availableNowTime.split(':'))
        formData.endDate = null
      } else if (form.availability === 'dateRange') {
        formData.startDate = new Date(form.startDate)
        formData.endDate = new Date(form.endDate)
      }

      // Remove unused fields
      delete formData.availableNowTime
      delete formData.userId

      // Explicitly set availability and duration
      formData.availability = form.availability || 'availableNow'
      formData.duration = form.duration || 15

      // Log final formData to verify before sending
      console.log('Final Form Data:', formData)

      const response = await axios.post('http://localhost:5000/api/appointments', formData, {
        headers: { Authorization: `Bearer ${token}` },
      })

      setAppointments([...appointments, response.data])
      setShowAddModal(false)
      fetchAppointments()
    } catch (error) {
      console.error('Error adding appointment:', error.response?.data || error.message)
    }
  }

  const handleEditAppointment = (appointment) => {
    setForm({
      ...appointment,
      availableNowTime:
        appointment.availability === 'availableNow'
          ? new Date(appointment.startDate).toTimeString().slice(0, 5)
          : '',
    })
    setShowAddModal(true)
    setIsEdit(true)
  }

  // const handleUpdateAppointment = async () => {
  //   const { _id, createdAt, updatedAt, ...updateData } = form

  //   if (updateData.availability === 'availableNow') {
  //     updateData.startDate = new Date()
  //     updateData.startDate.setHours(...updateData.availableNowTime.split(':'))
  //     updateData.endDate = null
  //   } else if (updateData.availability === 'dateRange') {
  //     updateData.startDate = new Date(updateData.startDate)
  //     updateData.endDate = new Date(updateData.endDate)
  //   }

  //   try {
  //     const response = await axios.put(
  //       `http://localhost:5000/api/appointments/${form._id}`,
  //       updateData,
  //     )
  //     setAppointments(appointments.map((app) => (app._id === form._id ? response.data : app)))
  //     setShowAddModal(false)
  //     fetchAppointments()
  //   } catch (error) {
  //     console.error('Error updating appointment:', error.response?.data || error.message)
  //   }
  // }

  const handleUpdateAppointment = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      console.error('No token found in localStorage. Please log in.')
      return
    }

    // Create a copy of form data and adjust fields as needed
    const { _id, createdAt, updatedAt, userId, ...updateData } = form

    // Convert categoryId to string if it's an object
    updateData.categoryId =
      typeof updateData.categoryId === 'object' ? updateData.categoryId._id : updateData.categoryId

    // Set dates based on availability type
    if (updateData.availability === 'availableNow') {
      updateData.startDate = new Date()
      updateData.startDate.setHours(...updateData.availableNowTime.split(':'))
      updateData.endDate = null
    } else if (updateData.availability === 'dateRange') {
      updateData.startDate = new Date(updateData.startDate)
      updateData.endDate = new Date(updateData.endDate)
    }

    // Remove availableNowTime if it's only used locally for display
    delete updateData.availableNowTime

    // Log the update data for verification
    console.log('Final Update Data:', updateData)

    try {
      const response = await axios.put(
        `http://localhost:5000/api/appointments/${form._id}`,
        updateData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )

      setAppointments(appointments.map((app) => (app._id === form._id ? response.data : app)))
      setShowAddModal(false)
      fetchAppointments()
    } catch (error) {
      console.error('Error updating appointment:', error.response?.data || error.message)
    }
  }

  // const handleDeleteAppointment = async () => {
  //   try {
  //     await axios.delete(`http://localhost:5000/api/appointments/${appointmentToDelete}`)
  //     setAppointments(appointments.filter((app) => app._id !== appointmentToDelete))
  //     setShowDeleteModal(false)
  //   } catch (error) {
  //     console.error('Error deleting appointment:', error.response?.data || error.message)
  //   }
  // }

  const handleDeleteAppointment = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      console.error('No token found in localStorage. Please log in.')
      return
    }

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/appointments/${appointmentToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token here
          },
        },
      )

      setAppointments(appointments.filter((app) => app._id !== appointmentToDelete))
      setShowDeleteModal(false)
      console.log('Appointment deleted successfully:', response.data)
    } catch (error) {
      console.error('Error deleting appointment:', error.response?.data || error.message)
    }
  }

  // const handleViewCalendar = (appointment) => {
  //   const url = `${window.location.origin}/calendar-view?appointmentId=${appointment._id}&categoryColor=${appointment.categoryId.color}`
  //   window.open(url, '_blank')
  // }
  // const handleViewCalendar = (appointment) => {
  //   const url = `${window.location.origin}/calendar?appointmentDate=${appointment.startDate}&categoryColor=${appointment.categoryId.color}`
  //   window.open(url, '_blank')
  // }
  // const handleViewCalendar = (appointment) => {
  //   const url = `${window.location.origin}/calendar?appointmentDate=${appointment.startDate}&categoryColor=${appointment.categoryId.color}`
  //   window.open(url, '_blank', 'width=800,height=600,toolbar=0,location=0,menubar=0')
  // }
  // const handleViewCalendar = (appointment) => {
  //   const url = `${window.location.origin}/calendar?appointmentDate=${appointment.startDate}&categoryColor=${appointment.categoryId.color}`
  //   window.open(url, '_blank', 'fullscreen=yes')
  // }
  const handleViewCalendar = (appointment) => {
    const url = `${window.location.origin}/calendar?appointmentDate=${appointment.startDate}&categoryId=${appointment.categoryId}`
    window.open(url, '_blank', 'width=800,height=600')
  }

  const resetForm = () => {
    setForm({
      title: '',
      categoryId: '',
      duration: 15,
      availability: 'availableNow',
      startDate: '',
      endDate: '',
      availableNowTime: '',
      status: 'Pending',
      userId,
    })
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Appointments</strong>
            <CButton color="primary" onClick={toggleAddModal} className="float-end me-2">
              <CIcon icon={cilPlus} /> Add Appointment
            </CButton>
          </CCardHeader>
          <CCardBody>
            <CFormInput
              type="text"
              placeholder="Search by title or category..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="mb-3"
            />
            <CTable hover responsive align="middle">
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>#</CTableHeaderCell>
                  <CTableHeaderCell>Title</CTableHeaderCell>
                  <CTableHeaderCell>Category</CTableHeaderCell>
                  <CTableHeaderCell>Duration</CTableHeaderCell>
                  <CTableHeaderCell>Availability</CTableHeaderCell>
                  <CTableHeaderCell>Status</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {Array.isArray(filteredAppointments) &&
                  filteredAppointments.map((appointment, index) => (
                    <CTableRow key={appointment._id}>
                      <CTableDataCell>{index + 1}</CTableDataCell>
                      <CTableDataCell>{appointment.title}</CTableDataCell>
                      <CTableDataCell>{appointment.categoryId.name}</CTableDataCell>
                      <CTableDataCell>{appointment.duration} mins</CTableDataCell>
                      <CTableDataCell>
                        {appointment.availability === 'availableNow'
                          ? `${new Date(appointment.startDate).toLocaleDateString()} ${new Date(
                              appointment.startDate,
                            ).toLocaleTimeString()}`
                          : `${new Date(appointment.startDate).toLocaleDateString()} - ${new Date(
                              appointment.endDate,
                            ).toLocaleDateString()}`}
                      </CTableDataCell>
                      <CTableDataCell>{appointment.status}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="info"
                          variant="outline"
                          onClick={() => handleEditAppointment(appointment)}
                          className="me-2"
                        >
                          <CIcon icon={cilPencil} />
                        </CButton>
                        <CButton
                          color="danger"
                          variant="outline"
                          onClick={() => {
                            setShowDeleteModal(true)
                            setAppointmentToDelete(appointment._id)
                          }}
                        >
                          <CIcon icon={cilTrash} />
                        </CButton>
                        <CButton
                          color="success"
                          variant="outline"
                          onClick={() => handleViewCalendar(appointment)}
                          className="me-2"
                        >
                          <CIcon icon={cilCalendar} /> View Calendar
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>

        {/* Add/Edit Modal */}
        <CModal visible={showAddModal} onClose={() => setShowAddModal(false)}>
          <CModalHeader>
            <CModalTitle>{isEdit ? 'Edit' : 'Add'} Appointment</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm>
              <CFormInput
                label="Title"
                name="title"
                value={form.title}
                onChange={handleInputChange}
                required
                placeholder="Enter appointment title"
              />
              <CFormSelect
                label="Category"
                name="categoryId"
                value={form.categoryId}
                onChange={handleInputChange}
                required
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </CFormSelect>
              <CFormSelect
                label="Duration"
                name="duration"
                value={form.duration}
                onChange={handleInputChange}
                required
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
                <option value="custom">Custom Duration</option>
              </CFormSelect>
              {form.duration === 'custom' && (
                <CFormInput
                  label="Custom Duration (in minutes)"
                  name="customDuration"
                  type="number"
                  onChange={handleInputChange}
                  placeholder="Enter custom duration"
                />
              )}
              <div className="mb-3">
                <label className="form-label">Availability:</label>
                <CFormCheck
                  type="radio"
                  id="availableNow"
                  name="availability"
                  value="availableNow"
                  checked={form.availability === 'availableNow'}
                  onChange={handleInputChange}
                  label="Available Now"
                />
                {form.availability === 'availableNow' && (
                  <CFormInput
                    label="Select Time"
                    type="time"
                    name="availableNowTime"
                    value={form.availableNowTime}
                    required
                    onChange={handleInputChange}
                  />
                )}
                <CFormCheck
                  type="radio"
                  id="dateRange"
                  name="availability"
                  value="dateRange"
                  checked={form.availability === 'dateRange'}
                  onChange={handleInputChange}
                  label="Date Range"
                />
              </div>
              {form.availability === 'dateRange' && (
                <>
                  <CFormInput
                    type="date"
                    label="Start Date"
                    name="startDate"
                    value={form.startDate}
                    onChange={handleInputChange}
                  />
                  <CFormInput
                    type="date"
                    label="End Date"
                    name="endDate"
                    value={form.endDate}
                    onChange={handleInputChange}
                  />
                </>
              )}
              <CFormSelect
                label="Status"
                name="status"
                value={form.status}
                onChange={handleInputChange}
                required
              >
                <option value="Pending">Pending</option>
                <option value="Process">Process</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Completed">Completed</option>
              </CFormSelect>
            </CForm>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setShowAddModal(false)}>
              Cancel
            </CButton>
            <CButton
              color="primary"
              onClick={isEdit ? handleUpdateAppointment : handleAddAppointment}
            >
              {isEdit ? 'Update' : 'Add'}
            </CButton>
          </CModalFooter>
        </CModal>

        {/* Delete Confirmation Modal */}
        <CModal visible={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
          <CModalHeader>
            <CModalTitle>Confirm Deletion</CModalTitle>
          </CModalHeader>
          <CModalBody>Are you sure you want to delete this appointment?</CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </CButton>
            <CButton color="danger" onClick={handleDeleteAppointment}>
              Delete
            </CButton>
          </CModalFooter>
        </CModal>
      </CCol>
    </CRow>
  )
}

export default Appointments
