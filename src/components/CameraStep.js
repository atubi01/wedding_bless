import React, { useState, useRef, useEffect } from 'react';
import { Camera } from 'lucide-react';

const CameraStep = ({ onImageCapture }) => {
  const videoRef = useRef(null);
  const [isVideoActive, setIsVideoActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const streamRef = useRef(null);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false
      });
      videoRef.current.srcObject = stream;
      streamRef.current = stream;
      setIsVideoActive(true);
    } catch (err) {
      console.error('Camera error:', err);
      alert('לא ניתן לגשת למצלמה. אנא ודאו שאישרתם גישה למצלמה');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsVideoActive(false);
  };

  const captureImage = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    
    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0);
    
    const imageUrl = canvas.toDataURL('image/jpeg');
    setCapturedImage(imageUrl);
    onImageCapture(imageUrl);
    stopCamera();
  };

  if (capturedImage) {
    return (
      <div className="space-y-4 text-center">
        <img 
          src={capturedImage} 
          alt="תמונה שצולמה" 
          className="max-w-sm mx-auto rounded-lg border-2 border-rose-200"
        />
        <button
          onClick={() => {
            setCapturedImage(null);
            startCamera();
          }}
          className="px-6 py-2 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors"
        >
          צלם שוב
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 text-center">
      {isVideoActive ? (
        <div className="relative max-w-sm mx-auto">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full rounded-lg border-2 border-rose-200"
          />
          <div className="mt-4 space-x-4 space-x-reverse">
            <button
              onClick={captureImage}
              className="px-6 py-2 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors"
            >
              צלם תמונה
            </button>
            <button
              onClick={stopCamera}
              className="px-6 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors"
            >
              ביטול
            </button>
          </div>
        </div>
      ) : (
        <div className="border-2 border-rose-200 rounded-lg p-12 mx-auto max-w-sm bg-pink-50">
          <Camera className="w-16 h-16 mx-auto text-rose-400 mb-4" />
          <button
            onClick={startCamera}
            className="px-6 py-2 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors"
          >
            פתח מצלמה
          </button>
        </div>
      )}
    </div>
  );
};

export default CameraStep;
