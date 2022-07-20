import { ChangeEvent, SetStateAction, useState, Dispatch } from 'react';
import { ref, StorageError, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { auth, storage } from '../lib/config';
import Loader from './Loader';

export const ImageUploader= ({ setDownloadURL }: {setDownloadURL: Dispatch<SetStateAction<string | undefined>>} ) => {

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<StorageError>()

  const uploadFile = (e:ChangeEvent<HTMLInputElement>) => {
    const files = (e.target as HTMLInputElement).files;
    console.log(e.target.value)

    if(!files?.length){
        new  Error("No file selected")
        return
    }
    const file = files[0]
    const storageRef = ref(storage, `${auth.currentUser?.displayName}/${file.name}`)
    setUploading(true)
    // const collectionRef = collection(db, 'images')

    const upload = uploadBytesResumable(storageRef, file)

    upload.on('state_changed', ((snapshot) => {
      console.log(snapshot)
      const pct = Number(((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0))
      setProgress(pct)
    }),(error) => {
      console.log(error.message)
      setError(error)
    }, () => {
      getDownloadURL(upload.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        setUploading(false)
        setDownloadURL(downloadURL)
      });
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