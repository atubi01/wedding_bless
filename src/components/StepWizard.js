import React, { useState } from 'react';
import { QrCode, Type, Check, Heart } from 'lucide-react';
import CameraStep from './CameraStep';
import SubmissionStatus from './SubmissionStatus';
import { handleSubmission } from '../utils/firebaseUtils';
import { steps } from '../data/wizardSteps';

const StepWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    qrCode: '',
    picture: null,
    text: ''
  });
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageCapture = (imageUrl) => {
    setFormData(prev => ({ ...prev, picture: imageUrl }));
  };

  const submitForm = async () => {
    setIsSubmitting(true);
    const result = await handleSubmission(formData);
    
    if (result.success) {
      setSubmissionStatus({
        error: false,
        message: '!תודה רבה. הברכה שלך נשלחה בהצלחה'
      });
      setCurrentStep(steps.length - 1);
    } else {
      setSubmissionStatus({
        error: true,
        message: 'אירעה שגיאה בשליחת הטופס. אנא נסו שוב.'
      });
    }
    setIsSubmitting(false);
  };

  const nextStep = async () => {
    if (currentStep === steps.length - 2) {
      await submitForm();
    } else if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 relative" dir="rtl">
      {/* Progress bar */}
      <div className="mb-12">
        <div className="flex flex-row-reverse justify-between mb-2">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center ${
                index <= currentStep ? 'text-rose-500' : 'text-gray-300'
              }`}
            >
              <div className="relative">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
                    index <= currentStep
                      ? 'border-rose-500 bg-rose-50'
                      : 'border-gray-200'
                  }`}
                >
                  {step.icon}
                </div>
                <div className="hidden sm:block mt-2 text-sm font-light">{step.title}</div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-full h-0.5 mx-2 ${
                    index < currentStep ? 'bg-rose-300' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg p-8 shadow-sm min-h-64 mb-8">
        {steps[currentStep].content}
      </div>

      {/* Navigation */}
      <div className="flex flex-row-reverse justify-between">
        <button
          onClick={prevStep}
          className={`px-6 py-2 rounded-full font-light ${
            currentStep === 0
              ? 'bg-gray-100 text-gray-400'
              : 'bg-rose-500 text-white hover:bg-rose-600 transition-colors'
          }`}
          disabled={currentStep === 0 || isSubmitting}
        >
          הקודם
        </button>
        <button
          onClick={nextStep}
          className={`px-6 py-2 rounded-full font-light ${
            currentStep === steps.length - 1
              ? 'bg-gray-100 text-gray-400'
              : 'bg-rose-500 text-white hover:bg-rose-600 transition-colors'
          }`}
          disabled={currentStep === steps.length - 1 || isSubmitting}
        >
          {currentStep === steps.length - 2 ? 'שלח' : 'הבא'}
          {isSubmitting && <span className="mr-2">...</span>}
        </button>
      </div>

      {submissionStatus && (
        <SubmissionStatus 
          status={submissionStatus} 
          onClose={() => setSubmissionStatus(null)}
        />
      )}
    </div>
  );
};

export default StepWizard;
