// AuthService.js
import axios from 'axios';
import conf from '../conf/conf.js';

export class AuthService {
    // Create Account
    async createAccount({ email, password, username }) {
        try {
            const response = await axios.post(`${conf.backendUrl}/register`, {
                email,
                password,
                username,
            });
            return response.data;
        } catch (error) {
            console.error("Error creating account:", error.response?.data || error.message);
            throw error;
        }
    }

    // Login
    async login({ email, password }) {
        try {
            const response = await axios.post(`${conf.backendUrl}/login`, {
                email,
                password,
            });
            // Store user data in localStorage
            localStorage.setItem('user', JSON.stringify(response.data));
            return response.data;
        } catch (error) {
            console.error("Error during login:", error.response?.data || error.message);
            throw error;
        }
    }

    // Get Current User
    async getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    // Logout
    async logout() {
        localStorage.removeItem('user');
    }
}

const authService = new AuthService();
export default authService;
