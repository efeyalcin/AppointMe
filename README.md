# AppointMe - Universal Appointment Scheduler

AppointMe is a high-performance, multi-tenant scheduling platform designed to allow various businesses (barbershops, clinics, studios) to host their own branded booking pages under a single system.

Built with a "Mobile-First" approach using **React**, **Vite**, and **Tailwind CSS**.

## 🚀 Features

### 🏢 Multi-Tenant Architecture
- **Dynamic Branding**: The application adapts its visual identity (Name, Logo, Colors) based on the URL.
- **Tenant Isolation**: Data and configuration are isolated per business.
- **Demo Tenants**:
  - `/b/barber-shop` - The Gentle Barber (Blue Theme)
  - `/b/dental-clinic` - Bright Smiles Dental (Teal Theme)
  - `/b/yoga-studio` - Zen Flow Yoga (Dark Mode)

### 🔒 Security & User Experience
- **OTP Verification**: Integrated mock SMS verification (`123456`) to prevent spam bookings.
- **Passwordless Login**: Users access the system via Name and Phone Number.
- **Dark Mode**: Fully supported system-wide dark theme.

### 🛠 Admin Dashboard
- **Business Portal**: Secure area for business owners to manage bookings and settings.
- **Branding Editor**: Update business display name in real-time.
- **Access**: `/admin` (Credentials: `admin@datefind.com` / `admin`)

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS v3
- **Routing**: React Router DOM v6
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **State Management**: React Context API

## 🏃‍♂️ Getting Started

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/AppointMe.git
    cd AppointMe
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Run Development Server**
    ```bash
    npm run dev
    ```

4.  **Open in Browser**
    Visit `http://localhost:5173` to see the Landing Page.

## 🧪 Mock Data Services

This project uses a Mock Service Layer (`src/services`) to simulate backend interactions, allowing for frontend development without a live server.
- **MockTenantService**: Manages business profiles.
- **MockBookingService**: Generates availability slots.
- **MockOTPService**: Simulates SMS delivery.

## 📱 Mobile First

The interface is optimized for touch interactions and small screens, ensuring a native-app-like experience on mobile web browsers.
