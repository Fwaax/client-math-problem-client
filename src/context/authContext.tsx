import { createContext, useContext } from 'react'
import { useJwtToken } from '../hooks/useJwtToken'

const AuthContext = createContext<ReturnType<typeof useJwtToken> | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const auth = useJwtToken();
    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return context;
};