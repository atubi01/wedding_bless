import React from 'react';
import { QrCode, Type, Heart, Camera } from 'lucide-react';

// Changed to a plain array instead of a function
export const WizardSteps = [
    {
        title: 'ברוכים הבאים',
        icon: <Heart className="w-6 h-6" />,
        getContent: () => (
            <div className="text-center space-y-6">
                <div className="text-rose-500">
                    <Heart className="w-16 h-16 mx-auto animate-pulse" />
                </div>
                <h2 className="text-3xl font-serif italic text-gray-800">ברוכים הבאים ליום המיוחד שלנו</h2>
                <p className="text-gray-600 font-light text-lg">אנחנו שמחים שבחרתם להיות חלק מהחגיגה שלנו</p>
            </div>
        )
    },
    {
        title: 'סריקת QR',
        icon: <QrCode className="w-6 h-6" />,
        getContent: () => (
            <div className="text-center space-y-4">
                <div className="border-2 border-rose-200 rounded-lg p-12 mx-auto max-w-sm bg-pink-50">
                    <QrCode className="w-16 h-16 mx-auto text-rose-400" />
                    <p className="mt-4 text-gray-600 font-light">סרקו את קוד ה-QR שבהזמנה שלכם</p>
                </div>
            </div>
        )
    },
    {
        title: 'צילום תמונה',
        icon: <Camera className="w-6 h-6" />,
        getContent: ({ onImageCapture }) => (
            <div className="space-y-4 text-center">
                <div className="border-2 border-rose-200 rounded-lg p-12 mx-auto max-w-sm bg-pink-50">
                    <Camera
                        className="w-16 h-16 mx-auto text-rose-400 cursor-pointer"
                        onClick={() => onImageCapture && onImageCapture()}
                    />
                    <p className="mt-4 text-gray-600 font-light">הנציחו את הרגע המיוחד</p>
                </div>
            </div>
        )
    },
    {
        title: 'הוספת ברכה',
        icon: <Type className="w-6 h-6" />,
        getContent: ({ formData, setFormData }) => (
            <div className="space-y-4">
                <div className="text-center mb-6">
                    <h3 className="text-2xl font-serif italic text-gray-800">השאירו את ברכתכם</h3>
                    <p className="text-gray-600 font-light">שתפו את המחשבות והאיחולים שלכם</p>
                </div>
                <textarea
                    className="w-full p-6 border-2 border-rose-200 rounded-lg h-40 bg-pink-50 focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-200 text-right"
                    placeholder="כתבו את הברכה שלכם כאן..."
                    value={formData.text}
                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                />
            </div>
        )
    },
    {
        title: 'תודה',
        icon: <Heart className="w-6 h-6" />,
        getContent: () => (
            <div className="text-center space-y-6">
                <div className="relative w-24 h-24 mx-auto">
                    <div className="absolute inset-0 animate-ping bg-rose-100 rounded-full" />
                    <div className="relative w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center">
                        <Heart className="w-12 h-12 text-rose-500" />
                    </div>
                </div>
                <h2 className="text-3xl font-serif italic text-gray-800">!תודה רבה</h2>
                <p className="text-gray-600 font-light text-lg">הברכה שלך נשלחה בהצלחה</p>
            </div>
        )
    }
];