import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { BookingProvider } from './context/BookingContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { TenantProvider } from './context/TenantContext.jsx'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider>
                <TenantProvider>
                    <AuthProvider>
                        <BookingProvider>
                            <App />
                        </BookingProvider>
                    </AuthProvider>
                </TenantProvider>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>,
)
