import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Summary = () => {
  const [activeStep, setActiveStep] = useState(4);
  const navigate = useNavigate();

  const steps = [
    { number: 1, label: "Your Info", path: "/" },
    { number: 2, label: "Select Plan", path: "/about" },
    { number: 3, label: "ADD-ONS", path: "/addons" },
    { number: 4, label: "Summary", path: "/summary" },
    { number: 5, label: "Thanks", path: "/thanks" },
  ];
  const handleNext = () => {
    const nextStep = activeStep + 1;
    setActiveStep(nextStep);
    const nextRoute = steps.find((step) => step.number === nextStep)?.path;
    if (nextRoute) navigate(nextRoute);
  };

  const handleBack = () => {
    const prevStep = activeStep - 1;
    setActiveStep(prevStep);
    const prevRoute = steps.find((step) => step.number === prevStep)?.path;
    if (prevRoute) navigate(prevRoute);
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex flex-col lg:flex-row w-[90%] max-w-5xl h-[600px] p-5 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="w-screen lg:w-[30%] h-[60%] lg:h-auto rounded-lg absolute lg:relative top-0 left-0 bg-[url('./assets/images/bg-sidebar-mobile.svg')] bg-cover bg-center bg-no-repeat text-white z-0 p-6">
          <ul className="flex flex-row items-center gap-4 lg:flex-col lg:items-start">
            {steps.slice(0, 4).map((step) => (
              <li
                key={step.number}
                className="flex items-center space-x-4 cursor-pointer"
                onClick={() => {
                  setActiveStep(step.number);
                  navigate(step.path);
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
        <div className="lg:w-[70%] h-full w-full p-8 px-10 sm:px-20 absolute top-[20%] left-0 right-0 z-10 bg-white rounded-md mx-auto lg:relative lg:top-0">
          <div>
            <h1 className="text-[#012a5f] font-bold text-[10px] sm:text-[30px]">
              Finishing Up
            </h1>
            <small className="text-[10px] text-gray-500 font-normal">
              Double-check everything looking okay before confirming.
            </small>
          </div>
          <div>
            <ul className="bg-gray-200 rounded-lg rounded-b-lg ">
              <li className="flex justify-between items-center p-5">
                <div>
                  <p className="text-[#012a5f] font-bold text-[10px] sm:text-[10px]">
                    Arcade (Monthly)
                  </p>
                  <small className="underline text-[10px] text-gray-500 font-normal">
                    change
                  </small>
                </div>
                <span className="text-[#012a5f] font-bold text-[10px] sm:text-[10px]">
                  $9/mo
                </span>
              </li>
              <li className="flex justify-between items-center p-5">
                <div>
                  <small className=" text-[10px] text-gray-500 font-normal">
                    Online Service
                  </small>
                </div>
                <span className="text-[#012a5f] font-bold text-[10px] sm:text-[10px]">
                  +$1/mo
                </span>
              </li>
              <li className="flex justify-between items-center p-5">
                <div>
                  <small className=" text-[10px] text-gray-500 font-normal">
                    Larger Storage
                  </small>
                </div>
                <span className="text-[#012a5f] font-bold text-[10px] sm:text-[10px]">
                  +$2/mo
                </span>
              </li>
              <li className="flex justify-between items-center p-5 bg-white">
                <div>
                  <small className=" text-[10px] text-gray-500 font-normal">
                    Total (per month)
                  </small>
                </div>
                <span className="text-[#6259ff] font-bold text-[10px] sm:text-[10px]">
                  +$12/mo
                </span>
              </li>
            </ul>
          </div>
          <div className="flex justify-between w-full mt-10">
            <button
              onClick={handleBack}
              disabled={activeStep === 1}
              className="back fixed bottom-10 sm:bottom-6 left-[50px] sm:left-[510px] bg-gray-200 text-gray-600 py-2 px-4 rounded hover:bg-white hover:text-[#012a5f] disabled:opacity-50"
            >
              Go Back
            </button>
            <button
              onClick={handleNext}
              className="next fixed bottom-10 sm:bottom-6 right-[50px] sm:right-[200px] bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
