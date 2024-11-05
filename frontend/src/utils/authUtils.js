export async function logoutUser() {
  try {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include', // Use this if you have cookies/session-based auth
    })

    localStorage.removeItem('token') // Clear the token from local storage
    localStorage.removeItem('role') // Clear the role from local storage
    window.location.href = '/login' // Redirect to the login page
  } catch (error) {
    console.error('Logout failed:', error)
  }
}
