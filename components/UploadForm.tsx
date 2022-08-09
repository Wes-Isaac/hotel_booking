import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { collection, addDoc } from "firebase/firestore";
import { ImageUploader } from "./ImageUploader";
import { db, timestamp } from "../lib/config";
import { toast } from 'react-toastify'


const UploadForm = () => {
  const {register, handleSubmit, setValue, reset } = useForm()
  const [downloadURL, setDownloadURL] = useState<string>();

const Uploader =(data: FieldValues) => {
  const collectionRef = collection(db, 'rooms')
  if(downloadURL){

    addDoc(collectionRef, {
      ...data,
      createdAt: timestamp(),
      UpdatedAt: timestamp(),
    }).then(() => {
      toast.success('Upload Successful', { position: toast.POSITION.TOP_CENTER })
      reset()
    })
  } else {
    toast.error('Please select an Image',{ position: toast.POSITION.TOP_CENTER })
    }
  }
  

  return (
    <form className="flex flex-col" 
    onSubmit={handleSubmit((data) => Uploader(data) )}>

      <ImageUploader setDownloadURL ={setDownloadURL} />
      <label className="my-2" htmlFor="title">Title:</label>
      <input className="my-1 p-2 rounded-tr-lg" { ...register("title", { required: true, minLength: 4, maxLength: 20 }) } type="text" id="title" name="title" placeholder="Title" required />
      <label className="my-2" htmlFor="price">Price:</label>
      <input className="my-1 p-2 rounded-tr-lg" { ...register("price") } type="number" min='50' id="price" name="price" placeholder="Price" required />
      <input className="my-6 p-2 text-lg cursor-pointer bg-white font-semibold  rounded-tr-lg hover:border-2 border-yellow-900" type="submit" value="Submit" onClick={() => {
          setValue("image", downloadURL);
        }} />
    </form>
  )
}

export default UploadForm;
 