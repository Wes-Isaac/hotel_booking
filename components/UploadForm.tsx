import { ImageUploader } from "./ImageUploader";

const UploadForm = () => {
  return (
    <form>
      <ImageUploader />
      <label htmlFor="title">Title:</label>
      <input type="text" id="title" placeholder="Title" />
      <label htmlFor="price">Price:</label>
      <input type="text" id="price" placeholder="Price" />
    </form>
  )
}

export default UploadForm;
 