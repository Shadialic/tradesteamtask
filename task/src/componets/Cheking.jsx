import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import { checkout, cheking } from "../api/api";
import { Toaster, toast } from "react-hot-toast";
import LoadStripe from "./LoadStripe";

const stripePromise = loadStripe("pk_test_51ODm4bSHaENjV1jr6QBv93m7yUjiUR2bCql3CNylL2bhvGcr3Fr8ZUEzlInPA3zAyDN8k8EUUUzGChUNHKWZXzAh00Q4Z4tzgS");

function Checking() {
  const navigate = useNavigate();
  const [opnstrip, setOpnStripe] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const result = await cheking();
        setClientSecret(result.clientSecret);
      } catch (err) {
        console.error("Error fetching client secret:", err);
      }
    };
    fetchClientSecret();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await checkout(formData);
      toast(response.message);
      if (response.status) {
        setOpnStripe(true);
        setOpen(true)
        setFormData({
          name: "",
          email: "",
          contact: "",
          address: "",
        });
      }
    } catch (err) {
      console.error("Error during checkout:", err);
    }
  };

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col lg:flex-row w-[80%] border-2 border-black mt-16">
        <div className="flex flex-col justify-center w-full lg:w-full p-8">
          <h3 className="text-xl mb-8 text-white font-mono font-semibold uppercase w-auto bg-amber-900 p-1 text-center">
            Details
          </h3>
          <form noValidate onSubmit={handleSubmit}>
            <div className="mb-4">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Fullname"
                className="border p-2 w-full border-amber-900"
              />
            </div>
            <div className="mb-4">
              <label>Contact</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Contact"
                className="border p-2 w-full border-amber-900"
              />
            </div>
            <div className="mb-4">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="border p-2 w-full border-amber-900"
              />
            </div>
            <div className="mb-4">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className="border p-2 w-full border-amber-900"
              />
            </div>
            <h3 className="text-xl mb-4 text-amber-900 font-mono font-semibold uppercase">
              Payment Type
            </h3>
            {clientSecret && (
              <div className="w-auto border-2 border-gray-200 bg-[#2257d3] flex justify-center p-2">
                <Elements stripe={stripePromise} options={options}>
                  <button type="submit" className="text-white font-bold">
                    50000 Pay
                  </button>
                  {opnstrip && (
                    <LoadStripe
                    open={open}
                    setOpen={setOpen}
                      formData={formData}
                      name={formData.name}
                      email={formData.email}
                      contact={formData.contact}
                      address={formData.address}
                    />
                  )}
                </Elements>
              </div>
            )}
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Checking;
