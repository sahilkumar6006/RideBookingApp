const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export const api = {
  auth: {
    login: async (credentials: { email: string; password: string }) => {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      return response.json();
    },
  },
  
  vehicles: {
    getAll: async () => {
      const response = await fetch(`${API_BASE_URL}/admin/vehicles`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      return response.json();
    },

    create: async (data: FormData) => {
      const response = await fetch(`${API_BASE_URL}/admin/vehicles`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
        body: data,
      });
      return response.json();
    },

    update: async (id: string, data: FormData) => {
      const response = await fetch(`${API_BASE_URL}/admin/vehicles/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
        body: data,
      });
      return response.json();
    },

    delete: async (id: string) => {
      const response = await fetch(`${API_BASE_URL}/admin/vehicles/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      return response.json();
    },
  },
}; 