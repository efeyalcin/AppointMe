import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import ConfirmationPage from './pages/ConfirmationPage';
import LandingPage from './pages/LandingPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import { useAuth } from './context/AuthContext';
import { useTenant } from './context/TenantContext'; // Ensure this hook is exported from context
import ThemeApplicator from './components/ThemeApplicator';

function TenantRoutes() {
    const { user } = useAuth();
    const { tenant } = useTenant();

    // If fetching or error, show loading. Ideally separate this into a Loading spinner component
    if (!tenant) {
        if (!window.location.pathname.includes('/b/')) return null;
        return <div className="min-h-screen flex items-center justify-center dark:text-white">Loading Business...</div>;
    }

    return (
        <Routes>
            <Route
                path="/login"
                element={!user ? <LoginPage /> : <Navigate to={`/b/${tenant.id}/`} replace />}
            />
            <Route
                path="/confirmation"
                element={user ? <ConfirmationPage /> : <Navigate to={`/b/${tenant.id}/login`} replace />}
            />
            <Route
                path="/"
                element={
                    user ? (
                        <Dashboard />
                    ) : (
                        <Navigate to={`/b/${tenant.id}/login`} replace />
                    )
                }
            />
            <Route path="*" element={<Navigate to={`/b/${tenant.id}/`} replace />} />
        </Routes>
    );
}

export default function App() {
    return (
        <>
            <ThemeApplicator />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/admin" element={<AdminLoginPage />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/b/:tenantId/*" element={<TenantRoutes />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </>
    );
}
