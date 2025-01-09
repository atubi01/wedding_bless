import React from 'react';
import { QrCode, Type, Check, Heart, Camera } from 'lucide-react';
import CameraStep from '../components/CameraStep';

export const steps = [
  {
    title: 'ברוכים הבאים',
    icon: <Heart className="w-6 h-6" />,
    content: (
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
    content: (
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
    content: <CameraStep />
  },
  {
    title: 'הוספת ברכה',
    icon: <Type className="w-6 h-6" />,
    content: (props) => (
      <div className="space-y-4">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-serif italic text-gray-800">השאירו את ברכתכם</h3>
          <p className="text-gray-600 font-light">שתפו את המחשבות והאיחולים שלכם</p>
        </div>
        <textarea
          className="w-full p-6 border-2 border-rose-200 rounded-lg h-40 bg-pink-50 focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-200 