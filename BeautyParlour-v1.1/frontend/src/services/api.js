import axios from 'axios'

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  'http://localhost:8000'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

/* ==========================
   REQUEST INTERCEPTOR
========================== */

apiClient.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem('adminToken')

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

/* ==========================
   RESPONSE INTERCEPTOR
========================== */

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(
        'adminToken'
      )

      localStorage.removeItem(
        'adminUser'
      )
    }

    return Promise.reject(error)
  }
)

/* ==========================
   APPOINTMENTS
========================== */

export const appointmentService = {
  createAppointment: (data) =>
    apiClient.post(
      '/appointments',
      data
    ),

  getAppointments: () =>
    apiClient.get('/appointments'),

  getAppointment: (id) =>
    apiClient.get(
      `/appointments/${id}`
    ),

  updateAppointment: (id, data) =>
    apiClient.patch(
      `/appointments/${id}`,
      data
    ),

  deleteAppointment: (id) =>
    apiClient.delete(
      `/appointments/${id}`
    ),
}

/* ==========================
   BEAUTY SERVICES
========================== */

export const serviceService = {
  getServices: () =>
    apiClient.get(
      '/beauty-services'
    ),

  getService: (id) =>
    apiClient.get(
      `/beauty-services/${id}`
    ),

  createService: (data) =>
    apiClient.post(
      '/beauty-services',
      data
    ),

  updateService: (
    id,
    data
  ) =>
    apiClient.patch(
      `/beauty-services/${id}`,
      data
    ),

  deleteService: (id) =>
    apiClient.delete(
      `/beauty-services/${id}`
    ),
}

/* ==========================
   WEBSITE SETTINGS
========================== */

export const websiteSettingsService =
  {
    getSettings: () =>
      apiClient.get(
        '/website-settings'
      ),

    getSetting: (id) =>
      apiClient.get(
        `/website-settings/${id}`
      ),

    createSetting: (data) =>
      apiClient.post(
        '/website-settings',
        data
      ),

    updateSetting: (
      id,
      data
    ) =>
      apiClient.patch(
        `/website-settings/${id}`,
        data
      ),
  }

/* ==========================
   LOCATIONS
========================== */

export const locationService = {
  getLocations: () =>
    apiClient.get('/locations'),

  getLocation: (id) =>
    apiClient.get(
      `/locations/${id}`
    ),
}

/* ==========================
   AUTH
========================== */

export const authService = {
  login: async (
    email,
    password
  ) => {
    const response =
      await apiClient.post(
        '/auth/login',
        {
          email,
          password,
        }
      )

    if (response.data.token) {
      localStorage.setItem(
        'adminToken',
        response.data.token
      )
    }

    if (response.data.user) {
      localStorage.setItem(
        'adminUser',
        JSON.stringify(
          response.data.user
        )
      )
    }

    return response
  },

  register: (data) =>
    apiClient.post(
      '/auth/register',
      data
    ),

  logout: () => {
    localStorage.removeItem(
      'adminToken'
    )

    localStorage.removeItem(
      'adminUser'
    )
  },

  getCurrentUser: () => {
    const user =
      localStorage.getItem(
        'adminUser'
      )

    return user
      ? JSON.parse(user)
      : null
  },

  isAuthenticated: () =>
    !!localStorage.getItem(
      'adminToken'
    ),
}

/* ==========================
   EXPORT
========================== */

export default apiClient