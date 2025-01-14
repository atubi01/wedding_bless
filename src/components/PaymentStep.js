import React, { useState } from 'react';
import { Smartphone, AlertCircle } from 'lucide-react';

const PaymentStep = ({ setPaymentCompleted }) => {
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    console.log('setPaymentCompleted:', setPaymentCompleted);
    const handlePayment = () => {
        if (!amount || isNaN(amount) || amount <= 0) {
            setError('אנא הזן סכום תקין');
            return;
        }

        // Replace with your Bit phone number
        const phoneNumber = "YOUR_BIT_PHONE_NUMBER";
        const bitLink = `bit://pay?phone=${phoneNumber}&amount=${amount}&note=${encodeURIComponent('תשלום לחתונה')}`;

        window.location.href = bitLink;
        setIsProcessing(true);

        // Set payment as completed
        // Note: In a real implementation, you would want to verify the payment was actually completed
        setPaymentCompleted(true);
    };

    return (
        <div className="max-w-md mx-auto p-6">
            <div className="text-center mb-8">
                <img
                    src="/images/bitLogo.png"
                    alt="Bit"
                    className="h-12 mx-auto mb-4"
                />
                <h2 className="text-2xl font-serif text-gray-800 mb-2">תשלום באמצעות Bit</h2>
            </div>

            <div className="space-y-6">
                <div className="relative">
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => {
                            setError('');
                            setAmount(e.target.value);
                        }}
                        placeholder="הזן סכום לתשלום"
                        className={`w-full px-4 py-3 text-lg text-center border-2 rounded-lg focus:outline-none transition-colors
                            ${error ? 'border-red-300 focus:border-red-400' : 'border-rose-200 focus:border-rose-400'}`}
                        disabled={isProcessing}
                    />
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">₪</span>
                </div>

                {error && (
                    <div className="flex items-center justify-center text-red-500 text-sm">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        <span>{error}</span>
                    </div>
                )}

                <button
                    onClick={handlePayment}
                    disabled={!amount || isProcessing}
                    className={`w-full py-3 rounded-lg flex items-center justify-center space-x-2 space-x-reverse
                        ${!amount || isProcessing
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-[#00ABC4] hover:bg-[#008FA3] transition-colors'} 
                        text-white`}
                >
                    <Smartphone className="w-5 h-5" />
                    <span>{isProcessing ? 'מעבד תשלום...' : 'תשלום'}</span>
                </button>
            </div>
        </div>
    );
};

export default PaymentStep;