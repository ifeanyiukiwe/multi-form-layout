// src/components/Nav.jsx
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const { activeStep, setActiveStep, steps } = useContext(GlobalContext);
  const navigate = useNavigate();

  return (
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
  );
};

export default Nav;
