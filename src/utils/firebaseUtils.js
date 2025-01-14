import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { db, storage, auth } from '../config/firebase';
import { signInAnonymously } from 'firebase/auth';  // Add this // Add this


const MAX_RETRIES = 3;

export const handleSubmission = async (formData) => {
  let retryCount = 0;

  while (retryCount < MAX_RETRIES) {
    try {
      await signInAnonymously(auth);
      const timestamp = Date.now();
      let mediaUrl = null;
      let mediaType = null;

      if (formData.picture && formData.picture.data) {
        mediaType = formData.picture.type;
        const extension = mediaType === 'video' ? '.mp4' : '.jpg';
        const fileName = `wedding-photos/${timestamp}${extension}`;
        const storageRef = ref(storage, fileName);

        // Make sure we're sending a proper data URL string
        const dataUrl = formData.picture.data.toString();
        if (!dataUrl.startsWith('data:')) {
          throw new Error('Invalid data URL format');
        }

        await uploadString(storageRef, dataUrl, 'data_url');
        mediaUrl = await getDownloadURL(storageRef);
      }

      await addDoc(collection(db, 'wedding-submissions'), {
        name: formData.name || '',
        address: formData.address || '',
        text: formData.text || '',
        mediaUrl: mediaUrl,
        mediaType: mediaType,
        timestamp: timestamp
      });

      return { success: true };
    } catch (error) {
      retryCount++;
      console.error('Upload attempt failed:', error, error.stack);
      if (retryCount === MAX_RETRIES) {
        return {
          success: false,
          error,
          message: 'לא הצלחנו לשמור את הברכה לאחר 3 ניסיונות. אנא נסו שוב מאוחר יותר.'
        };
      }
      await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
    }
  }
};