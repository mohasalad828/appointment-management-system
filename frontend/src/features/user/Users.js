// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import {
//   CTable,
//   CTableBody,
//   CTableDataCell,
//   CTableHead,
//   CTableHeaderCell,
//   CTableRow,
//   CCard,
//   CCardBody,
//   CCardHeader,
//   CButton,
//   CCol,
//   CRow,
//   CModal,
//   CModalBody,
//   CModalFooter,
//   CModalHeader,
//   CModalTitle,
//   CForm,
//   CFormInput,
//   CFormSelect,
//   CPagination,
//   CPaginationItem,
// } from '@coreui/react'
// import CIcon from '@coreui/icons-react'
// import { cilPencil, cilTrash, cilPlus } from '@coreui/icons'

// const Users = () => {
//   const [users, setUsers] = useState([])
//   const [filteredUsers, setFilteredUsers] = useState([])
//   const [showAddModal, setShowAddModal] = useState(false)
//   const [isEdit, setIsEdit] = useState(false)
//   const [form, setForm] = useState({
//     fullName: '',
//     email: '',
//     password: '',
//     gender: '',
//     phone: '',
//     role: 'User',
//   })
//   const [searchQuery, setSearchQuery] = useState('')
//   const [currentPage, setCurrentPage] = useState(1)
//   const itemsPerPage = 5

//   useEffect(() => {
//     fetchUsers()
//   }, [])

//   useEffect(() => {
//     setFilteredUsers(
//       users.filter(
//         (user) =>
//           user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           user.email.toLowerCase().includes(searchQuery.toLowerCase()),
//       ),
//     )
//   }, [searchQuery, users])

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/users')
//       setUsers(response.data)
//     } catch (error) {
//       console.error('Error fetching users:', error.response?.data || error.message)
//     }
//   }

//   const toggleAddModal = () => {
//     setShowAddModal(!showAddModal)
//     resetForm()
//     setIsEdit(false)
//   }

//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setForm({ ...form, [name]: value })
//   }

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value)
//   }

//   const handleAddUser = async () => {
//     try {
//       await axios.post('http://localhost:5000/api/users', form)
//       fetchUsers()
//       setShowAddModal(false)
//     } catch (error) {
//       console.error('Error adding user:', error.response?.data || error.message)
//     }
//   }

//   const handleEditUser = (user) => {
//     setForm({ ...user, password: '' })
//     setShowAddModal(true)
//     setIsEdit(true)
//   }

//   const handleUpdateUser = async () => {
//     if (!form._id) {
//       console.error('Error: No user ID found in form data for update.')
//       return
//     }
//     try {
//       await axios.put(`http://localhost:5000/api/users/${form._id}`, form)
//       fetchUsers()
//       setShowAddModal(false)
//     } catch (error) {
//       console.error('Error updating user:', error.response?.data || error.message)
//     }
//   }

//   const handleDeleteUser = async (userId) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/users/${userId}`)
//       fetchUsers()
//     } catch (error) {
//       console.error('Error deleting user:', error.response?.data || error.message)
//     }
//   }

//   const resetForm = () => {
//     setForm({
//       fullName: '',
//       email: '',
//       password: '',
//       gender: '',
//       phone: '',
//       role: 'User',
//     })
//   }

//   const handlePageChange = (page) => {
//     setCurrentPage(page)
//   }

//   const paginatedUsers = filteredUsers.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage,
//   )

//   return (
//     <CRow>
//       <CCol xs={12}>
//         <CCard className="mb-4">
//           <CCardHeader>
//             <strong>Users</strong>
//             <CButton color="primary" onClick={toggleAddModal} className="float-end me-2">
//               <CIcon icon={cilPlus} /> Add User
//             </CButton>
//             <CFormInput
//               placeholder="Search by name or email"
//               className="float-end me-3"
//               value={searchQuery}
//               onChange={handleSearchChange}
//               style={{ width: '200px' }}
//             />
//           </CCardHeader>
//           <CCardBody>
//             <CTable hover responsive align="middle">
//               <CTableHead>
//                 <CTableRow>
//                   <CTableHeaderCell>#</CTableHeaderCell>
//                   <CTableHeaderCell>Full Name</CTableHeaderCell>
//                   <CTableHeaderCell>Email</CTableHeaderCell>
//                   <CTableHeaderCell>Gender</CTableHeaderCell>
//                   <CTableHeaderCell>Phone</CTableHeaderCell>
//                   <CTableHeaderCell>Role</CTableHeaderCell>
//                   <CTableHeaderCell>Actions</CTableHeaderCell>
//                 </CTableRow>
//               </CTableHead>
//               <CTableBody>
//                 {paginatedUsers.map((user, index) => (
//                   <CTableRow key={user._id}>
//                     <CTableDataCell>{(currentPage - 1) * itemsPerPage + index + 1}</CTableDataCell>
//                     <CTableDataCell>{user.fullName}</CTableDataCell>
//                     <CTableDataCell>{user.email}</CTableDataCell>
//                     <CTableDataCell>{user.gender}</CTableDataCell>
//                     <CTableDataCell>{user.phone}</CTableDataCell>
//                     <CTableDataCell>{user.role}</CTableDataCell>
//                     <CTableDataCell>
//                       <CButton
//                         color="info"
//                         variant="outline"
//                         onClick={() => handleEditUser(user)}
//                         className="me-2"
//                       >
//                         <CIcon icon={cilPencil} />
//                       </CButton>
//                       <CButton
//                         color="danger"
//                         variant="outline"
//                         onClick={() => handleDeleteUser(user._id)}
//                       >
//                         <CIcon icon={cilTrash} />
//                       </CButton>
//                     </CTableDataCell>
//                   </CTableRow>
//                 ))}
//               </CTableBody>
//             </CTable>
//             <CPagination className="mt-3 justify-content-center">
//               <CPaginationItem
//                 disabled={currentPage === 1}
//                 onClick={() => handlePageChange(currentPage - 1)}
//               >
//                 Previous
//               </CPaginationItem>
//               {[...Array(Math.ceil(filteredUsers.length / itemsPerPage))].map((_, i) => (
//                 <CPaginationItem
//                   key={i}
//                   active={i + 1 === currentPage}
//                   onClick={() => handlePageChange(i + 1)}
//                 >
//                   {i + 1}
//                 </CPaginationItem>
//               ))}
//               <CPaginationItem
//                 disabled={currentPage === Math.ceil(filteredUsers.length / itemsPerPage)}
//                 onClick={() => handlePageChange(currentPage + 1)}
//               >
//                 Next
//               </CPaginationItem>
//             </CPagination>
//           </CCardBody>
//         </CCard>

//         <CModal visible={showAddModal} onClose={() => setShowAddModal(false)}>
//           <CModalHeader>
//             <CModalTitle>{isEdit ? 'Edit' : 'Add'} User</CModalTitle>
//           </CModalHeader>
//           <CModalBody>
//             <CForm>
//               <CRow className="g-3">
//                 <CCol md={6}>
//                   <CFormInput
//                     label="Full Name"
//                     name="fullName"
//                     value={form.fullName}
//                     onChange={handleInputChange}
//                     required
//                     placeholder="Enter full name"
//                   />
//                 </CCol>
//                 <CCol md={6}>
//                   <CFormInput
//                     label="Email"
//                     name="email"
//                     type="email"
//                     value={form.email}
//                     onChange={handleInputChange}
//                     required
//                     placeholder="Enter email"
//                   />
//                 </CCol>
//                 <CCol md={6}>
//                   <CFormInput
//                     label="Password"
//                     name="password"
//                     type="password"
//                     value={form.password}
//                     onChange={handleInputChange}
//                     placeholder="Enter new password (optional)"
//                   />
//                 </CCol>
//                 <CCol md={6}>
//                   <CFormSelect
//                     label="Gender"
//                     name="gender"
//                     value={form.gender}
//                     onChange={handleInputChange}
//                     required
//                   >
//                     <option value="">Select gender</option>
//                     <option value="male">Male</option>
//                     <option value="female">Female</option>
//                   </CFormSelect>
//                 </CCol>
//                 <CCol md={6}>
//                   <CFormInput
//                     label="Phone"
//                     name="phone"
//                     type="number"
//                     value={form.phone}
//                     onChange={handleInputChange}
//                     required
//                     placeholder="Enter phone number"
//                   />
//                 </CCol>
//                 <CCol md={6}>
//                   <CFormSelect
//                     label="Role"
//                     name="role"
//                     value={form.role}
//                     onChange={handleInputChange}
//                     required
//                   >
//                     <option value="User">User</option>
//                     <option value="Admin">Admin</option>
//                   </CFormSelect>
//                 </CCol>
//               </CRow>
//             </CForm>
//           </CModalBody>
//           <CModalFooter>
//             <CButton color="secondary" onClick={() => setShowAddModal(false)}>
//               Cancel
//             </CButton>
//             <CButton color="primary" onClick={isEdit ? handleUpdateUser : handleAddUser}>
//               {isEdit ? 'Update' : 'Add'} User
//             </CButton>
//           </CModalFooter>
//         </CModal>
//       </CCol>
//     </CRow>
//   )
// }

// export default Users
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
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash, cilPlus } from '@coreui/icons'

const Users = () => {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    gender: '',
    phone: '',
    role: 'User',
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    setFilteredUsers(
      users.filter(
        (user) =>
          user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    )
  }, [searchQuery, users])

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users')
      setUsers(response.data)
    } catch (error) {
      console.error('Error fetching users:', error.response?.data || error.message)
    }
  }

  const toggleAddModal = () => {
    setShowAddModal(!showAddModal)
    resetForm()
    setIsEdit(false)
  }

  const toggleDeleteModal = (userId) => {
    setUserToDelete(userId)
    setShowDeleteModal(!showDeleteModal)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleAddUser = async () => {
    try {
      await axios.post('http://localhost:5000/api/users', form)
      fetchUsers()
      setShowAddModal(false)
    } catch (error) {
      console.error('Error adding user:', error.response?.data || error.message)
    }
  }

  const handleEditUser = (user) => {
    setForm({ ...user, password: '' })
    setShowAddModal(true)
    setIsEdit(true)
  }

  const handleUpdateUser = async () => {
    if (!form._id) {
      console.error('Error: No user ID found in form data for update.')
      return
    }
    try {
      await axios.put(`http://localhost:5000/api/users/${form._id}`, form)
      fetchUsers()
      setShowAddModal(false)
    } catch (error) {
      console.error('Error updating user:', error.response?.data || error.message)
    }
  }

  const handleDeleteUser = async () => {
    if (!userToDelete) return
    try {
      await axios.delete(`http://localhost:5000/api/users/${userToDelete}`)
      fetchUsers()
      setShowDeleteModal(false)
    } catch (error) {
      console.error('Error deleting user:', error.response?.data || error.message)
    }
  }

  const resetForm = () => {
    setForm({
      fullName: '',
      email: '',
      password: '',
      gender: '',
      phone: '',
      role: 'User',
    })
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Users</strong>
            <CButton color="primary" onClick={toggleAddModal} className="float-end me-2">
              <CIcon icon={cilPlus} /> Add User
            </CButton>
            <CFormInput
              placeholder="Search by name or email"
              className="float-end me-3"
              value={searchQuery}
              onChange={handleSearchChange}
              style={{ width: '200px' }}
            />
          </CCardHeader>
          <CCardBody>
            <CTable hover responsive align="middle">
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>#</CTableHeaderCell>
                  <CTableHeaderCell>Full Name</CTableHeaderCell>
                  <CTableHeaderCell>Email</CTableHeaderCell>
                  <CTableHeaderCell>Gender</CTableHeaderCell>
                  <CTableHeaderCell>Phone</CTableHeaderCell>
                  <CTableHeaderCell>Role</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {paginatedUsers.map((user, index) => (
                  <CTableRow key={user._id}>
                    <CTableDataCell>{(currentPage - 1) * itemsPerPage + index + 1}</CTableDataCell>
                    <CTableDataCell>{user.fullName}</CTableDataCell>
                    <CTableDataCell>{user.email}</CTableDataCell>
                    <CTableDataCell>{user.gender}</CTableDataCell>
                    <CTableDataCell>{user.phone}</CTableDataCell>
                    <CTableDataCell>{user.role}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="info"
                        variant="outline"
                        onClick={() => handleEditUser(user)}
                        className="me-2"
                      >
                        <CIcon icon={cilPencil} />
                      </CButton>
                      <CButton
                        color="danger"
                        variant="outline"
                        onClick={() => toggleDeleteModal(user._id)}
                      >
                        <CIcon icon={cilTrash} />
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
            <CPagination className="mt-3 justify-content-center">
              <CPaginationItem
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </CPaginationItem>
              {[...Array(Math.ceil(filteredUsers.length / itemsPerPage))].map((_, i) => (
                <CPaginationItem
                  key={i}
                  active={i + 1 === currentPage}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </CPaginationItem>
              ))}
              <CPaginationItem
                disabled={currentPage === Math.ceil(filteredUsers.length / itemsPerPage)}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </CPaginationItem>
            </CPagination>
          </CCardBody>
        </CCard>

        {/* Add/Edit Modal */}
        <CModal visible={showAddModal} onClose={() => setShowAddModal(false)}>
          <CModalHeader>
            <CModalTitle>{isEdit ? 'Edit' : 'Add'} User</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm>
              <CRow className="g-3">
                <CCol md={6}>
                  <CFormInput
                    label="Full Name"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter full name"
                  />
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    label="Email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter email"
                  />
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    label="Password"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleInputChange}
                    placeholder="Enter new password (optional)"
                  />
                </CCol>
                <CCol md={6}>
                  <CFormSelect
                    label="Gender"
                    name="gender"
                    value={form.gender}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </CFormSelect>
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    label="Phone"
                    name="phone"
                    type="number"
                    value={form.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter phone number"
                  />
                </CCol>
                <CCol md={6}>
                  <CFormSelect
                    label="Role"
                    name="role"
                    value={form.role}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                  </CFormSelect>
                </CCol>
              </CRow>
            </CForm>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setShowAddModal(false)}>
              Cancel
            </CButton>
            <CButton color="primary" onClick={isEdit ? handleUpdateUser : handleAddUser}>
              {isEdit ? 'Update' : 'Add'} User
            </CButton>
          </CModalFooter>
        </CModal>

        {/* Delete Confirmation Modal */}
        <CModal visible={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
          <CModalHeader>
            <CModalTitle>Confirm Delete</CModalTitle>
          </CModalHeader>
          <CModalBody>Are you sure you want to delete this user?</CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </CButton>
            <CButton color="danger" onClick={handleDeleteUser}>
              Delete
            </CButton>
          </CModalFooter>
        </CModal>
      </CCol>
    </CRow>
  )
}

export default Users
