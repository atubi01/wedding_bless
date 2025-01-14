import React, { useState } from 'react';
import { Camera, Video } from 'lucide-react';

const CameraStep = ({ onImageCapture, initialImage }) => {
    const [capturedMedia, setCapturedMedia] = useState(initialImage);
    const [mediaType, setMediaType] = useState('image'); // 'image' or 'video'

    const handleImageCapture = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 800;
                const MAX_HEIGHT = 600;
                let width = img.width;
                let height = img.height;

                if (width > MAX_WIDTH) {
                    height = Math.round((height * MAX_WIDTH) / width);
                    width = MAX_WIDTH;
                }
                if (height > MAX_HEIGHT) {
                    width = Math.round((width * MAX_HEIGHT) / height);
                    height = MAX_HEIGHT;
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                const resizedImageUrl = canvas.toDataURL('image/jpeg', 0.8);
                const mediaData = {
                    type: 'image',
                    data: resizedImageUrl
                };
                setCapturedMedia(resizedImageUrl);
                setMediaType('image');
                onImageCapture(mediaData);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    };

    const handleVideoCapture = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const mediaData = {
                type: 'video',
                data: e.target.result
            };
            setCapturedMedia(e.target.result);
            setMediaType('video');
            onImageCapture(mediaData);
        };
        reader.readAsDataURL(file);
    };

    const captureMedia = (type) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = type === 'video' ? 'video/*' : 'image/*';
        input.capture = 'environment';

        input.onchange = (event) => {
            const file = event.target.files[0];
            if (file) {
                if (type === 'video') {
                    handleVideoCapture(file);
                } else {
                    handleImageCapture(file);
                }
            }
        };

        input.click();
    };

    return (
        <div className="space-y-4 text-center">
            {capturedMedia ? (
                <div className="space-y-4">
                    {mediaType === 'image' ? (
                        <img
                            src={capturedMedia}
                            alt="תמונה שצולמה"
                            className="max-w-full mx-auto rounded-lg border-2 border-rose-200"
                        />
                    ) : (
                        <video
                            src={capturedMedia}
                            controls
                            className="max-w-full mx-auto rounded-lg border-2 border-rose-200"
                        />
                    )}
                    <button
                        onClick={() => {
                            setCapturedMedia(null);
                            setMediaType('image');
                        }}
                        className="px-6 py-2 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors"
                    >
                        צלם שוב
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    <div
                        onClick={() => captureMedia('image')}
                        className="border-2 border-rose-200 rounded-lg p-12 mx-auto max-w-sm bg-pink-50 cursor-pointer hover:bg-pink-100 transition-colors mb-4"
                    >
                        <Camera className="w-16 h-16 mx-auto text-rose-400 mb-4" />
                        <button className="px-6 py-2 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors">
                            צלם תמונה
                        </button>
                    </div>
                    <div
                        onClick={() => captureMedia('video')}
                        className="border-2 border-rose-200 rounded-lg p-12 mx-auto max-w-sm bg-pink-50 cursor-pointer hover:bg-pink-100 transition-colors"
                    >
                        <Video className="w-16 h-16 mx-auto text-rose-400 mb-4" />
                        <button className="px-6 py-2 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors">
                            צלם וידאו
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CameraStep;