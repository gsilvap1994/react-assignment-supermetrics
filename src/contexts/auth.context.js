import { createContext, useContext, useState } from 'react';
import { AUTH_TOKEN_KEY } from '../helper/constants';
import api from '../services/api.service';
import StorageLayer from '../services/storage.service';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        !!StorageLayer.get({ key: AUTH_TOKEN_KEY })
    );

    async function doLogin({ name, email }) {
        const client_id = 'ju16a6m81mhid5ue1z3v2g0uh';
        const error = { name: false, email: false };

        if (!name) {
            error.name = true;
        }

        if (!email) {
            error.email = true;
        }

        if (!name || !email) {
            return error;
        }

        try {
            const response = await api.post('/assignment/register', {
                name,
                email,
                client_id,
            });

            const { data } = response;

            if (data.data && data.data.sl_token) {
                setIsAuthenticated(true);
                StorageLayer.set({ key: AUTH_TOKEN_KEY, value: data.data.sl_token });
                return data.data;
            }
            return false;
        } catch (error) {

            return { message: 'request error' };
        }
    }

    async function doLogout() {
        StorageLayer.clear();
        setIsAuthenticated(false);
        window.location.href = '/';
    }

    return (
        <AuthContext.Provider
            value={{ isAuthenticated: isAuthenticated, doLogin, doLogout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}

export default AuthContext;
