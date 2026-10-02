const API_URL = "http://localhost:5000";

export const connectFacebook = (): void => {
    window.location.href = `${API_URL}/api/auth/facebook/connect`;
};