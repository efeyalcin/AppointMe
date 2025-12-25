import { Link } from 'react-router-dom';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4 transition-colors">
            <div className="max-w-md w-full text-center space-y-8">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                    AppointMe
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    The Multi-Tenant Scheduling Platform
                </p>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                        Choose a Demo Business
                    </h2>
                    <div className="space-y-3">
                        <Link to="/b/barber-shop" className="block w-full py-3 px-4 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors font-medium">
                            The Gentle Barber
                        </Link>
                        <Link to="/b/dental-clinic" className="block w-full py-3 px-4 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 rounded-xl hover:bg-teal-100 dark:hover:bg-teal-900/40 transition-colors font-medium">
                            Bright Smiles Dental
                        </Link>
                        <Link to="/b/yoga-studio" className="block w-full py-3 px-4 bg-pink-50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300 rounded-xl hover:bg-pink-100 dark:hover:bg-pink-900/40 transition-colors font-medium">
                            Zen Flow Yoga
                        </Link>
                    </div>
                </div>

                <div className="flex justify-center">
                    <Link to="/admin" className="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 underline">
                        Business Owner? Login here
                    </Link>
                </div>
            </div>
        </div>
    );
}
