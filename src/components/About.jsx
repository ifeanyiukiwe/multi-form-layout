import { useNavigate } from "react-router-dom";
import { useState } from "react";
import arcade from "../assets/images/icon-arcade.svg";
import advanced from "../assets/images/icon-advanced.svg";
import pro from "../assets/images/icon-pro.svg";
import back from "../assets/images/left-chevron.png";
import front from "../assets/images/chevron.png";

const About = () => {
  const [activeStep, setActiveStep] = useState(2);
  const [activePlan, setActivePlan] = useState(null);
  const [billingType, setBillingType] = useState("monthly");
  const navigate = useNavigate();

  const steps = [
    { number: 1, label: "Your Info", path: "/" },
    { number: 2, label: "Select Plan", path: "/about" },
    { number: 3, label: "ADD-ONS", path: "/addons" },
    { number: 4, label: "Summary", path: "/summary" },
    { number: 5, label: "Thanks", path: "/thanks" },
  ];

  const choices = [
    { id: 1, img: arcade, name: "Arcade", price: "9/mo" },
    { id: 2, img: advanced, name: "Advanced", price: "12/mo" },
    { id: 3, img: pro, name: "Pro", price: "15/mo" },
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
      <div className="relative flex flex-col lg:flex-row w-[90%] p-5 max-w-5xl h-[600px] bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="w-screen lg:w-[30%] h-[60%] rounded-lg lg:h-auto absolute lg:relative top-0 left-0 bg-[url('./assets/images/bg-sidebar-mobile.svg')] bg-cover bg-center bg-no-repeat text-white z-0 p-6">
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
              Select Your Plan
            </h1>
            <small className="text-[10px] text-gray-500 font-normal">
              You have the option of monthly or yearly billing
            </small>
          </div>

          <div className="mt-1 sm:mt-4 flex flex-col lg:flex-row gap-4">
            {choices.map((choice) => (
              <ul
                key={choice.id}
                onClick={() => setActivePlan(choice.id)}
                className={`cursor-pointer border w-full lg:w-[150px]  border-[#6259ff] flex flex-col rounded-lg transition-all duration-200 ${
                  activePlan === choice.id ? "bg-purple-100" : "bg-white"
                }`}
              >
                <li className="flex flex-col items-start p-2 sm:p-8">
                  <img
                    src={choice.img}
                    alt={`${choice.name} icon`}
                    className="w-8 h-8 mb-4"
                  />
                  <p className="text-[#012a5f] font-medium text-sm">
                    {choice.name}
                  </p>
                  <small className="text-[10px] text-gray-500 font-normal">
                    ${choice.price}
                  </small>
                </li>
              </ul>
            ))}
          </div>
          <div className="mt-5 flex justify-center items-center bg-gray-200 py-2 px-4 rounded-lg gap-4">
            <p
              onClick={() => setBillingType("monthly")}
              className={`text-[10px] font-bold px-2 py-1 rounded cursor-pointer ${
                billingType === "monthly"
                  ? "bg-[#012a5f] text-white"
                  : "text-[#012a5f]"
              }`}
            >
              Monthly
            </p>
            <div className="relative inline-block w-10 align-middle select-none">
              <input
                type="checkbox"
                name="toggle"
                id="toggle"
                checked={billingType === "yearly"}
                onChange={() =>
                  setBillingType(
                    billingType === "monthly" ? "yearly" : "monthly"
                  )
                }
                className="absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-300 ease-in-out transform checked:translate-x-full"
              />
              <label
                htmlFor="toggle"
                className="block text-center overflow-hidden h-6 rounded-full bg-blue-950 cursor-pointer"
              ></label>
            </div>
            <p
              onClick={() => setBillingType("yearly")}
              className={`text-[10px] font-bold px-2 py-1 rounded cursor-pointer ${
                billingType === "yearly"
                  ? "bg-[#012a5f] text-white"
                  : "text-[#012a5f]"
              }`}
            >
              Yearly
            </p>
          </div>

          <div className="flex justify-between w-full mt-10">
            <button
              onClick={handleBack}
              disabled={activeStep === 1}
              className="back sm:block hidden  fixed bottom-10 sm:bottom-6 left-[50px] sm:left-[510px] bg-gray-200 text-gray-600 py-2 px-4 rounded hover:bg-white hover:text-[#012a5f] disabled:opacity-50"
            >
              Go Back
            </button>
            <button
              onClick={handleBack}
              disabled={activeStep === 1}
              className="back sm:hidden block fixed bottom-10 sm:bottom-6 left-[25px] sm:left-[510px] bg-gray-200 text-gray-600 py-2 px-1 rounded hover:bg-white hover:text-[#012a5f] disabled:opacity-50"
            >
              <img src={back} alt="" width="20px" />
            </button>
            <button
              onClick={handleNext}
              className="next sm:block hidden fixed bottom-10 sm:bottom-6 right-[50px] sm:right-[200px] bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Next
            </button>
            <button
              onClick={handleNext}
              className="next sm:hidden block fixed bottom-10 sm:bottom-6 right-[25px] sm:right-[200px] bg-blue-500 text-white py-2 px-1 rounded hover:bg-blue-600"
            >
              <img src={front} alt="" width="20px" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
