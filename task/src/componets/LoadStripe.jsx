import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { SuccessRequest } from "../api/api";
// import { SuccessRequest } from "../../api/UserApi";

function LoadStripe({ formData, open, setOpen }) {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const handleOpen = () => setOpen((cur) => !cur);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      console.error("Stripe or Elements not initialized.");
      return;
    }

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {},
        redirect: "if_required",
      });

      if (paymentIntent) {
        const response = await SuccessRequest(formData);
        toast(response.data.message);
        console.log(response, "response when it is successful");

        if (response.status === 200) {
          toast.success(response.message, {
            position: "top-right",
            autoClose: 2000,
            style: {
              marginTop: "50px",
            },
          });
          navigate("/success");
        }
      }

      if (error) {
        console.error(error);
      } else {
        console.log("Payment successful:", paymentIntent);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Button
        className="flex justify-center items-center w-[100%] bg-[#2257d3]  text-white font-prompt ml-4"
        onClick={handleOpen}
      ></Button>
      {open && (
        <div className="z-10 fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-4 rounded-md shadow-md w-full max-w-md">
            <div className="flex justify-between">
              <div className="">
                <h5 className="text-blue-gray text-xl font-semibold">
                  Make Your Payment
                </h5>
                <p className="text-gray text-sm">
                  Choose which card you want to connect
                </p>
              </div>

              <button
                className="text-blue-gray focus:outline-none  mt-2"
                onClick={handleOpen}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="mt-6 flex flex-row justify-around space-x-72">
              <h1 className="font-prompt">Course Amount</h1>
              <span className="font-prompt font-prompt-semibold">5000</span>
            </div>

            <div className="border-b-2 border-gray-400"></div>
            <div className="mt-12">
              <PaymentElement />
            </div>
            <div
              className="w-auto flex justify-center mt-5"
              onClick={handleSubmit}
            >
              <button className="bg-blue-500 w-44 h-12 text-white font-semibold  font-prompt rounded-md">
                PAY
              </button>
            </div>
            <ToastContainer />
          </div>
        </div>
      )}
    </div>
  );
}
export default LoadStripe;
