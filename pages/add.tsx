import { NextPage } from "next";
import UploadForm from "../components/UploadForm";

const add:NextPage = () => {
  return(
    <div className=" w-[90%] mx-auto">
      <h1 className="text-2xl font-medium underline underline-offset-8 decoration-1 my-8">Upload Form</h1>
      <UploadForm />
    </div>
  )

}

export default add;
