import React from 'react';

const TextStep = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-serif italic text-gray-800">השאירו את ברכתכם</h3>
      </div>
      
      <input
        name="name"
        value={formData.name || ''}
        onChange={handleChange}
        placeholder="שם מלא"
        className="w-full p-4 border-2 border-rose-200 rounded-lg bg-pink-50 focus:outline-none focus:border-rose-400 text-right"
      />

      <input
        name="address"
        value={formData.address || ''}
        onChange={handleChange}
        placeholder="כתובת"
        className="w-full p-4 border-2 border-rose-200 rounded-lg bg-pink-50 focus:outline-none focus:border-rose-400 text-right"
      />

      <textarea
        name="text"
        value={formData.text || ''}
        onChange={handleChange}
        placeholder="כתבו את הברכה שלכם כאן..."
        className="w-full p-4 border-2 border-rose-200 rounded-lg h-32 bg-pink-50 focus:outline-none focus:border-rose-400 text-right"
      />
    </div>
  );
};

export default TextStep;
