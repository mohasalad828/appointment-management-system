export const fetchAppointmentData = async () => {
  try {
    const response = await fetch('/api/dashboard/appointments-summary');
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching appointment data:', error);
    return { Pending: 0, Cancelled: 0, 'In-Process': 0, Completed: 0 };
  }
};
