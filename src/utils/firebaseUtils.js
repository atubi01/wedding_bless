import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadString } from 'firebase/storage';
import { db, storage } from '../config/firebase';

export const handleSubmission = async (formData) => {
  const timestamp = new Date().getTime();
  const imageFileName = `wedding-photos/${timestamp}.jpg`;
  
  try {
    // Upload image
    let imageUrl = null;
    if (formData.picture) {
      const storageRef = ref(storage, imageFileName);
      await uploadString(storageRef, formData.picture, 'data_url');
      imageUrl = await storageRef.getDownloadURL();
    }

    // Save to Firestore
    await addDoc(collection(db, 'wedding-submissions'), {
      text: formData.text,
      imageUrl: imageUrl,
      timestamp: timestamp,
      qrCode: formData.qrCode
    });

    return { success: true };
  } catch (error) {
    console.error('Submission error:', error);
    return { success: false, error };
  }
};
