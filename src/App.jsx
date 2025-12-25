import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfileSetupPage from './pages/ProfileSetupPage';
import Dashboard from './pages/Dashboard';
import ConfirmationPage from './pages/ConfirmationPage';
import { useAuth } from './context/AuthContext';

export default function App() {
    const { user } = useAuth();

    return (
        <Routes>
            <Route
                path="/login"
                element={!user ? <LoginPage /> : <Navigate to="/" replace />}
            />
            <Route
                path="/signup"
                element={!user ? <SignupPage /> : <Navigate to="/" replace />}
            />
            <Route
                path="/profile-setup"
                element={user && !user.profileComplete ? <ProfileSetupPage /> : <Navigate to="/" replace />}
            />
            <Route
                path="/confirmation"
                element={user && user.profileComplete ? <ConfirmationPage /> : <Navigate to="/" replace />}
            />
            <Route
                path="/"
                element={
                    user ? (
                        !user.profileComplete ? (
                            <Navigate to="/profile-setup" replace />
                        ) : (
                            <Dashboard />
                        )
                    ) : (
                        <Navigate to="/login" replace />
                    )
                }
            />
        </Routes>
    );
}
