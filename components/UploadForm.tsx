

const UploadForm = () => {
  return (
    <form>
      <input type="file" />
      <label htmlFor="title">Title:</label>
      <input type="text" id="title" placeholder="Title" />
      <label htmlFor="price">Price:</label>
      <input type="text" id="price" placeholder="Price" />
    </form>
  )
}

export default UploadForm;
 