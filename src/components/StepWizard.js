import React, { useState, useEffect } from 'react';
import { WizardSteps } from '../data/wizardSteps';
import { handleSubmission } from '../utils/firebaseUtils';

const StepWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(() => {
    try {
      const savedData = localStorage.getItem('wizardFormData');
      const parsedData = savedData ? JSON.parse(savedData) : {};
      return {
        name: parsedData.name || '',
        address: parsedData.address || '',
        text: parsedData.text || '',
        picture: null // Don't store picture in localStorage
      };
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return {
        name: '',
        address: '',
        text: '',
        picture: null
      };
    }
  });
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    try {
      // Store only text fields, not the picture
      const storageData = {
        name: formData.name,
        address: formData.address,
        text: formData.text
      };
      localStorage.setItem('wizardFormData', JSON.stringify(storageData));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [formData.name, formData.address, formData.text]);
  const handleImageCapture = (imageUrl) => {
    setFormData(prev => ({ ...prev, picture: imageUrl }));
  };

  // Update handleSubmit function
  const handleSubmit = async () => {
    if (!formData.name || !formData.address || !formData.text) {
      setSubmissionStatus({
        error: true,
        message: 'נא למלא את כל השדות הנדרשים'
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await handleSubmission(formData);
      if (result.success) {
        setSubmissionStatus({ error: false, message: 'הברכה נשלחה בהצלחה!' });
        setCurrentStep(currentStep + 1);
        localStorage.removeItem('wizardFormData');
      } else {
        setSubmissionStatus({
          error: true,
          message: result.message || 'אירעה שגיאה, אנא נסו שוב'
        });
      }
    } catch (error) {
      setSubmissionStatus({
        error: true,
        message: 'אירעה שגיאה, אנא נסו שוב'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < WizardSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const stepProps = {
    onImageCapture: handleImageCapture,
    formData,
    setFormData
  };

  const renderNavigationButtons = () => {
    if (isSubmitting) {
      return (
          <button disabled className="px-6 py-2 rounded-full bg-gray-400 text-white">
            שולח...
          </button>
      );
    }

    if (currentStep === WizardSteps.length - 1) {
      return null;
    }

    return (
        <div className="flex flex-row-reverse justify-between">
          <button
              onClick={prevStep}
              className={`px-6 py-2 rounded-full font-light ${
                  currentStep === 0
                      ? 'bg-gray-100 text-gray-400'
                      : 'bg-rose-500 text-white hover:bg-rose-600 transition-colors'
              }`}
              disabled={currentStep === 0}
          >
            הקודם
          </button>

          {currentStep < WizardSteps.length - 2 && (
              <button
                  onClick={nextStep}
                  className="px-6 py-2 rounded-full bg-rose-500 text-white hover:bg-rose-600 transition-colors"
              >
                הבא
              </button>
          )}

          {currentStep === WizardSteps.length - 2 && (
              <button
                  onClick={handleSubmit}
                  className="px-6 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors"
              >
                שלח
              </button>
          )}
        </div>
    );
  };

  return (
      <div className="max-w-2xl mx-auto p-6 relative" dir="rtl">
        <div className="mb-12">
          <div className="flex flex-row-reverse justify-between mb-2">
            {WizardSteps.map((step, index) => (
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
                  {index < WizardSteps.length - 1 && (
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

        <div className="bg-white rounded-lg p-8 shadow-sm min-h-64 mb-8">
          {WizardSteps[currentStep].getContent(stepProps)}
        </div>

        {renderNavigationButtons()}

        {submissionStatus && (
            <div
                className={`mt-4 p-4 rounded-lg text-center ${
                    submissionStatus.error ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                }`}
            >
              {submissionStatus.message}
            </div>
        )}
      </div>
  );
};

export default StepWizard;