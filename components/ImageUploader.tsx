import { FormEvent, InputHTMLAttributes, useState } from 'react';
import { ref, StorageError, uploadBytesResumable } from 'firebase/storage'

import { auth, storage } from '../lib/config';
import Loader from './Loader';
import { FirebaseError } from 'firebase/app';

export const ImageUploader= () => {

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<StorageError>()

  const uploadFile = (e:FormEvent<HTMLInputElement>) => {
    const files = (e.target as HTMLInputElement).files; 

    if(!files){
        new  Error("No file selected")
        return
    }

    const file = files[0]
    const storageRef = ref(storage, file.name)
    setUploading(true)
    // const collectionRef = collection(db, 'images')

    uploadBytesResumable(storageRef, file)
    .on('state_changed', ((snapshot) => {
      console.log(snapshot)
      const pct = Number(((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0))
      setProgress(pct)
    }),(error) => {
      console.log(error.message)
      setError(error)

    }
    )
    
    
  }

  return (
    <div>
       <label className="btn">
            📸 Upload Img
            <input type="file" onChange={uploadFile} accept="image/x-png,image/gif,image/jpeg" />
          </label>
          
          <Loader show={uploading} /> {uploading && <h3>{progress}%</h3>}
    </div>
  )
}