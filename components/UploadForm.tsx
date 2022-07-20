import { ImageUploader } from "./ImageUploader";
import { useState } from "react";
const UploadForm = () => {
  const [downloadURL, setDownloadURL] = useState<string>();

  return (
    <form>
      <ImageUploader  setDownloadURL ={setDownloadURL} />
      <label htmlFor="title">Title:</label>
      <input type="text" id="title" placeholder="Title" />
      <label htmlFor="price">Price:</label>
      <input type="text" id="price" placeholder="Price" />
    </form>
  )
}

export default UploadForm;
 