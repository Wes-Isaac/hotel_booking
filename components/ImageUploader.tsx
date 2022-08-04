import { ChangeEvent, SetStateAction, useState, Dispatch } from 'react';
import { ref, StorageError, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { useForm } from 'react-hook-form';
import { auth, storage } from '../lib/config';
import Loader from './Loader';
import { toast } from 'react-toastify';

export const ImageUploader = ({ setDownloadURL }: { setDownloadURL: Dispatch<SetStateAction<string | undefined>> }) => {

  const { register } = useForm()
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<StorageError>()

  const uploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = (e.target as HTMLInputElement).files;

    if (!files?.length) {
      new Error("No file selected")
      return
    }
    const file = files[0]
    const storageRef = ref(storage, `${auth.currentUser?.displayName}/${file.name}`)
    setUploading(true)


    const upload = uploadBytesResumable(storageRef, file)

    upload.on('state_changed', ((snapshot) => {
      const pct = Number(((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0))
      setProgress(pct)
    }), (error) => {
      toast.error(`${error.message}`, { position: toast.POSITION.TOP_CENTER, hideProgressBar: true, autoClose: 800 })
      setError(error)
    }, () => {
      getDownloadURL(upload.snapshot.ref).then((downloadURL) => {
        setUploading(false)
        setDownloadURL(downloadURL)
      })}
    )}

  return (
    <div>
      <label className="btn cursor-pointer text-2xl font-medium">
        📸 Upload Img
        <input className='invisible' {...register("image", { required: true })} type="file" name='image' onChange={uploadFile} accept="image/x-png,image/gif,image/jpeg" />
      </label>

      <Loader show={uploading} /> {uploading && <h3>{progress}%</h3>}
    </div>
  )
}
