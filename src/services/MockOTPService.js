export const MockOTPService = {
    // Simulate sending an SMS
    sendOTP: async (phoneNumber) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const code = "123456"; // Fixed code for mock
                console.log(`[MockOTPService] SMS sent to ${phoneNumber}. Code: ${code}`);
                resolve({ success: true, message: "OTP sent" });
            }, 800);
        });
    },

    // Verify the code
    verifyOTP: async (phoneNumber, code) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (code === "123456") {
                    resolve({ success: true });
                } else {
                    reject(new Error("Invalid verification code"));
                }
            }, 600);
        });
    }
};
