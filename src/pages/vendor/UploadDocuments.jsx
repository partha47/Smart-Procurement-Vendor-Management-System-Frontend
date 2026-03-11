



import { useState } from "react";
import { uploadDocument } from "../../api/vendorService";

export default function UploadDocuments() {

  const [form, setForm] = useState({
    documentName: "",
    documentNumber: "",
    documentType: ""
  });

  const vendorId = localStorage.getItem("vendorId");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {

    uploadDocument({
      ...form,
      vendorId: vendorId
    })
      .then(() => alert("Document Uploaded"))
      .catch(err => console.error(err));
  };

  return (
    <div>

      <h3>Upload Document</h3>

      <input
        name="documentName"
        placeholder="Document Name"
        onChange={handleChange}
      />

      <input
        name="documentNumber"
        placeholder="Document Number"
        onChange={handleChange}
      />

      <input
        name="documentType"
        placeholder="Document Type"
        onChange={handleChange}
      />

      <button onClick={handleSubmit}>
        Upload
      </button>

    </div>
  );
}