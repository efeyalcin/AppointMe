import { useState, useEffect } from 'react';
import { X, Smartphone, ArrowRight, Loader2 } from 'lucide-react';
import { MockOTPService } from '../services/MockOTPService';

export default function OTPVerificationModal({ isOpen, onClose, onVerify, phoneNumber }) {
    const [code, setCode] = useState('');
    const [step, setStep] = useState('sending'); // sending | input | verifying
    const [error, setError] = useState('');

    useEffect(() => {
        if (isOpen) {
            // Reset state when opened
            setCode('');
            setError('');
            setStep('sending');
            // Auto send OTP
            sendCode();
        }
    }, [isOpen]);

    const sendCode = async () => {
        setStep('sending');
        try {
            await MockOTPService.sendOTP(phoneNumber);
            setStep('input');
        } catch (err) {
            setError("Failed to send SMS. Please try again.");
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        setError('');
        setStep('verifying');
        try {
            await MockOTPService.verifyOTP(phoneNumber, code);
            onVerify();
        } catch (err) {
            setError("Invalid code. Please try again.");
            setStep('input');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-sm w-full p-6 relative animate-in fade-in zoom-in duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                    <X className="h-5 w-5" />
                </button>

                <div className="text-center mb-6">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
                        <Smartphone className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Verify Your Number</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        We sent a code to <span className="font-semibold text-gray-900 dark:text-gray-200">{phoneNumber}</span>
                    </p>
                </div>

                {step === 'sending' && (
                    <div className="flex flex-col items-center justify-center py-8">
                        <Loader2 className="h-8 w-8 text-blue-500 animate-spin mb-2" />
                        <p className="text-sm text-gray-500">Sending SMS...</p>
                    </div>
                )}

                {(step === 'input' || step === 'verifying') && (
                    <form onSubmit={handleVerify} className="space-y-4">
                        {error && (
                            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-500 text-sm text-center">
                                {error}
                            </div>
                        )}

                        <div>
                            <input
                                type="text"
                                maxLength="6"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className="block w-full text-center text-2xl tracking-widest font-mono p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-300"
                                placeholder="000000"
                                autoFocus
                            />
                            <p className="text-xs text-center text-gray-400 mt-2">
                                For demo, verify with code: <b>123456</b>
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={step === 'verifying' || code.length < 4}
                            className="w-full flex items-center justify-center py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                        >
                            {step === 'verifying' ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <>
                                    Verify Booking <ArrowRight className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
