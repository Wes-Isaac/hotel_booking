import { useState } from "react";
import { useForm } from "react-hook-form";
import { collection, addDoc } from "firebase/firestore";
import { ImageUploader } from "./ImageUploader";
import { db, timestamp } from "../lib/config";
import { toast } from 'react-toastify'


const UploadForm = () => {
  const {register, handleSubmit, setValue, reset } = useForm()
  const [downloadURL, setDownloadURL] = useState<string>();


  

  return (
    <form onSubmit={handleSubmit((data) => {
      const collectionRef = collection(db, 'rooms')
      addDoc(collectionRef, {
        ...data,
        createdAt: timestamp(),
        UpdatedAt: timestamp(),
        reserved: false,
      }).then(() => {
        toast.success('Upload Successful', { position: toast.POSITION.TOP_CENTER })
        reset()
        
      })

      }
    )}>
      <ImageUploader  setDownloadURL ={setDownloadURL} />
      <label htmlFor="title">Title:</label>
      <input { ...register("title", { required: true, minLength: 4, maxLength: 20 }) } type="text" id="title" name="title" placeholder="Title" required />
      <label htmlFor="price">Price:</label>
      <input { ...register("price") } type="text" id="price" name="price" placeholder="Price" required />
      <input type="submit" value="Submit" onClick={() => {
          setValue("image", downloadURL);
        }} />
    </form>
  )
}

export default UploadForm;
 