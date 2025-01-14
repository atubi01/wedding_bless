import React from 'react';
import { Type, Heart, Camera } from 'lucide-react';
import CameraStep from '../components/CameraStep';
import { CreditCard } from 'lucide-react';
import TextStep from '../components/TextStep';
import PaymentStep from "../components/PaymentStep";

// Changed to a plain array instead of a function
export const WizardSteps = [
    {
        title: 'ברוכים הבאים',
        icon: <Heart className="w-6 h-6" />,
        getContent: () => (
            <div className="text-center space-y-8">
                <div className="text-rose-500">
                    <img
                        src={process.env.PUBLIC_URL + '/images/BnayaAndAviv.jpg'}
                        alt="Wedding Welcome"
                        className="w-64 h-64 mx-auto
              border-8 border-white
              shadow-lg
              object-cover
              transform rotate-3
              hover:rotate-0 transition-transform duration-300"
                        style={{
                            boxShadow: '2px 3px 15px rgba(0,0,0,0.2), 0 0 30px rgba(0,0,0,0.1)'
                        }}
                    />
                </div>
                <h2
                    className="text-5xl font-dancing-script text-gray-800 leading-relaxed"
                    style={{
                        fontFamily: "'Dancing Script', cursive",
                        textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                    }}
                >
                    ברוכים הבאים ליום המיוחד שלנו
                </h2>
                <p className="text-gray-600 font-light text-lg">אנחנו שמחים שבחרתם להיות חלק מהחגיגה שלנו</p>
            </div>
        )
    },
    {
        title: 'תשלום',
        icon: <CreditCard className="w-6 h-6" />,
        getContent: (props) => (
            <PaymentStep {...props} />
        )
    },
    {
        title: 'צילום תמונה',
        icon: <Camera className="w-6 h-6"/>,
        getContent: ({onImageCapture, formData}) => (
            // <div className="space-y-4 text-center">
            //     <div className="border-2 border-rose-200 rounded-lg p-12 mx-auto max-w-sm bg-pink-50">
            //         <Camera
            //             className="w-16 h-16 mx-auto text-rose-400 cursor-pointer"
            //             onClick={() => onImageCapture && onImageCapture()}
            //         />
            //         <p className="mt-4 text-gray-600 font-light">הנציחו את הרגע המיוחד</p>
            //     </div>
            // </div>
            <CameraStep onImageCapture={onImageCapture} initialImage={formData.picture}/>
        )
    },
    {
        title: 'הוספת ברכה',
        icon: <Type className="w-6 h-6" />,
        getContent: ({ formData, setFormData }) => (
            <TextStep formData={formData} setFormData={setFormData} />
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
