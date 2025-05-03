import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import thanks from "../assets/images/icon-thank-you.svg";

const Thanks = () => {
  const navigate = useNavigate();

  // Access the global state values and setter functions
  const {
    activeStep,
    setActiveStep,
    userInfo,
    goToNextStep,
    goToPreviousStep,
    steps,
  } = useContext(GlobalContext);

  // Sync the local state with the global state
  useEffect(() => {
    setActiveStep(activeStep);
  }, [activeStep, setActiveStep]);

  const handleBack = () => {
    goToPreviousStep();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex flex-col lg:flex-row w-[90%] max-w-5xl h-[600px] bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="w-screen lg:w-[30%] h-[60%] lg:h-auto absolute lg:relative top-0 left-0 bg-[url('./assets/images/bg-sidebar-mobile.svg')] bg-cover bg-center bg-no-repeat text-white z-0 p-6">
          <ul className="flex flex-row items-center gap-4 lg:flex-col lg:items-start">
            {steps.slice(0, 4).map((step) => (
              <li
                key={step.number}
                className="flex items-center space-x-4 cursor-pointer"
                onClick={() => {
                  setActiveStep(step.number);
                  if (step.path) navigate(step.path);
                }}
              >
                <span
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${
                    activeStep === step.number
                      ? "bg-blue-200 text-blue-900"
                      : "bg-transparent border border-white"
                  }`}
                >
                  {step.number}
                </span>
                <div className="hidden md:block">
                  <small className="uppercase text-[10px] text-gray-300">
                    Step {step.number}
                  </small>
                  <p className="text-sm font-medium">{step.label}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="lg:w-[70%] w-full p-8 flex flex-col justify-center items-center 
                     absolute top-[20%] left-0 right-0 z-10 bg-white rounded-md mx-auto
                     lg:relative lg:top-0 lg:z-10 lg:bg-white"
        >
          <img src={thanks} alt="thank-you-mark" width="40px" />
          <div className="text-center mt-5">
            <h1 className="text-2xl font-bold mb-2">Thank You!</h1>
            <h6 className="text-[12px] font-extralight my-2">
              {userInfo.name} | {userInfo.email} | {userInfo.phone}
            </h6>

            <small className="text-gray-400 block max-w-sm">
              Thanks for confirming your subscription! We hope you have fun
              using our platform. If you ever need support, please feel free to
              email us at support@loremgaming.com.
            </small>
          </div>
          <button
            onClick={handleBack}
            className="back fixed bottom-10 sm:bottom-6 left-[50px] sm:left-[450px] bg-gray-200 text-gray-600 py-2 px-4 rounded hover:bg-white hover:text-[#012a5f]"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Thanks;
