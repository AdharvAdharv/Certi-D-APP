import React, { useState, useEffect } from "react";
import { useCertContext } from "../Context/Certificate";

function Issue_certificate() {
  const {
    connectWallet,
    currentAccount,
    issueCertificate,
    getCertificate,
  } = useCertContext();

  const [form, setForm] = useState({
    ID: "",
    Name: "",
    Course: "",
    Grade: "",
    Date: "",
  });

  const [fetchId, setFetchId] = useState("");
  const [output, setOutput] = useState("");

  useEffect(() => {
    connectWallet();
  }, []);
  

  const handleWallet = () => {
    connectWallet();
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ID, Name, Course, Grade, Date } = form;
    if (!ID || !Name || !Course || !Grade || !Date)
      return alert("Please fill all fields");

    await issueCertificate(ID, Name, Course, Grade, Date);
    setForm({
      ID: "",
      Name: "",
      Course: "",
      Grade: "",
      Date: "",
    });
  };

  const hadndleClick = async () => {
    if (!fetchId) return alert("Enter certificate ID");

    const cert = await getCertificate(fetchId);
    console.log(cert);

  if (cert && cert.name) {
    setOutput(
      `ID: ${cert.id}, Name: ${cert.name}, Course: ${cert.course}, Grade: ${cert.grade}, Date: ${cert.date}`
    );
  } else {
    setOutput("Certificate not found");
  }
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">

        {/* ✅ Dynamic Connect Button */}
        <input
          type="button"
          value={currentAccount ? "Wallet Connected" : "Connect to MetaMask"}
          onClick={handleWallet}
          disabled={!!currentAccount}
          className={`mb-6 px-6 py-3 font-semibold rounded-lg shadow transition ${
            currentAccount
              ? "bg-green-500 text-white hover:bg-green-600 cursor-not-allowed opacity-90"
              : "bg-yellow-400 text-black hover:bg-yellow-500"
          }`}
        />

        {/* Certificate Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-5"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Certificate Form
          </h2>

          {["ID", "Name", "Course", "Grade", "Date"].map((field) => (
            <div key={field}>
              <label className="block text-gray-700 font-medium mb-1">
                {field}:
              </label>
              <input
                type={field === "Date" ? "date" : "text"}
                name={field}
                value={form[field]}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          ))}

          <input
            type="submit"
            value="Submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg shadow hover:bg-blue-600 transition"
          />
        </form>

        {/* Fetch Certificate Section */}
        <div className="mt-10 flex flex-col items-center space-y-4">
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Enter Certificate ID"
              onChange={(e) => setFetchId(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="button"
              value="Get Certificate"
              onClick={hadndleClick}
              className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition"
            />
          </div>

          {output && (
  <div className="mt-6 w-full max-w-md bg-white border border-gray-300 rounded-xl shadow-lg p-6">
    <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
      Certificate Details
    </h3>
    <div className="space-y-2 text-gray-700">
      {output.split(", ").map((item, index) => (
        <p key={index} className="text-base">
          {item}
        </p>
      ))}
    </div>
  </div>
)}

        </div>
      </div>
    </div>
  );
}

export default Issue_certificate;
