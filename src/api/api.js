// API Configuration and all API calls for fixmytech

const API_BASE_URL = 'https://api.fixmytech.com'; // Replace with your actual API URL

// Helper function for making API requests
async function apiRequest(endpoint, method = 'GET', body = null, token = null) {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    throw error;
  }
}

// ==================== AUTH APIs ====================

export const authAPI = {
  // Register a new user
  register: async (userData) => {
    return apiRequest('/auth/register', 'POST', userData);
  },

  // Login user
  login: async (credentials) => {
    return apiRequest('/auth/login', 'POST', credentials);
  },

  // Logout user
  logout: async (token) => {
    return apiRequest('/auth/logout', 'POST', null, token);
  },

  // Get current user profile
  getProfile: async (token) => {
    return apiRequest('/auth/profile', 'GET', null, token);
  },

  // Update user profile
  updateProfile: async (profileData, token) => {
    return apiRequest('/auth/profile', 'PUT', profileData, token);
  },

  // Forgot password
  forgotPassword: async (email) => {
    return apiRequest('/auth/forgot-password', 'POST', { email });
  },

  // Reset password
  resetPassword: async (token, newPassword) => {
    return apiRequest('/auth/reset-password', 'POST', { token, newPassword });
  },
};

// ==================== WORKER APIs ====================

export const workerAPI = {
  // Get all workers
  getAllWorkers: async (token, filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    const endpoint = `/workers?${queryParams}`;
    return apiRequest(endpoint, 'GET', null, token);
  },

  // Get worker by ID
  getWorkerById: async (id, token) => {
    return apiRequest(`/workers/${id}`, 'GET', null, token);
  },

  // Create new worker profile
  createWorker: async (workerData, token) => {
    return apiRequest('/workers', 'POST', workerData, token);
  },

  // Update worker profile
  updateWorker: async (id, workerData, token) => {
    return apiRequest(`/workers/${id}`, 'PUT', workerData, token);
  },

  // Delete worker
  deleteWorker: async (id, token) => {
    return apiRequest(`/workers/${id}`, 'DELETE', null, token);
  },

  // Search workers by skill/location
  searchWorkers: async (query, token) => {
    return apiRequest(`/workers/search?q=${encodeURIComponent(query)}`, 'GET', null, token);
  },
};

// ==================== JOB APIs ====================

export const jobAPI = {
  // Get all jobs
  getAllJobs: async (token, filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    const endpoint = `/jobs?${queryParams}`;
    return apiRequest(endpoint, 'GET', null, token);
  },

  // Get job by ID
  getJobById: async (id, token) => {
    return apiRequest(`/jobs/${id}`, 'GET', null, token);
  },

  // Create new job
  createJob: async (jobData, token) => {
    return apiRequest('/jobs', 'POST', jobData, token);
  },

  // Update job
  updateJob: async (id, jobData, token) => {
    return apiRequest(`/jobs/${id}`, 'PUT', jobData, token);
  },

  // Delete job
  deleteJob: async (id, token) => {
    return apiRequest(`/jobs/${id}`, 'DELETE', null, token);
  },

  // Apply for a job
  applyForJob: async (jobId, token) => {
    return apiRequest(`/jobs/${jobId}/apply`, 'POST', null, token);
  },

  // Get job applications
  getJobApplications: async (jobId, token) => {
    return apiRequest(`/jobs/${jobId}/applications`, 'GET', null, token);
  },
};

// ==================== REVIEW APIs ====================

export const reviewAPI = {
  // Get reviews for a worker
  getWorkerReviews: async (workerId, token) => {
    return apiRequest(`/workers/${workerId}/reviews`, 'GET', null, token);
  },

  // Add a review
  addReview: async (workerId, reviewData, token) => {
    return apiRequest(`/workers/${workerId}/reviews`, 'POST', reviewData, token);
  },

  // Update a review
  updateReview: async (reviewId, reviewData, token) => {
    return apiRequest(`/reviews/${reviewId}`, 'PUT', reviewData, token);
  },

  // Delete a review
  deleteReview: async (reviewId, token) => {
    return apiRequest(`/reviews/${reviewId}`, 'DELETE', null, token);
  },
};

// ==================== NOTIFICATION APIs ====================

export const notificationAPI = {
  // Get user notifications
  getNotifications: async (token) => {
    return apiRequest('/notifications', 'GET', null, token);
  },

  // Mark notification as read
  markAsRead: async (notificationId, token) => {
    return apiRequest(`/notifications/${notificationId}/read`, 'PUT', null, token);
  },

  // Mark all notifications as read
  markAllAsRead: async (token) => {
    return apiRequest('/notifications/read-all', 'PUT', null, token);
  },

  // Delete notification
  deleteNotification: async (notificationId, token) => {
    return apiRequest(`/notifications/${notificationId}`, 'DELETE', null, token);
  },
};

// Export all APIs as default
export default {
  auth: authAPI,
  worker: workerAPI,
  job: jobAPI,
  review: reviewAPI,
  notification: notificationAPI,
};
