import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import Nav from "./Nav";
const AddsOn = () => {
  const {
    activeStep,
    setActiveStep,
    selectedAddons,
    setSelectedAddons,
    steps,
    allAddOns,
  } = useContext(GlobalContext);

  const navigate = useNavigate();

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

  // const togglePackage = (item) => {
  //   setSelectedAddons(item);
  // };

  const togglePackage = (item) => {
    setSelectedAddons((prevSelected) => {
      const isAlreadySelected = prevSelected.some((pkg) => pkg.id === item.id);

      if (isAlreadySelected) {
        return prevSelected.filter((pkg) => pkg.id !== item.id);
      } else {
        return [...prevSelected, item];
      }
    });
  };

  console.log("Addons array:", selectedAddons);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex flex-col lg:flex-row w-[90%] p-5 max-w-5xl h-[600px] bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Sidebar */}
        {/* <div className="w-screen lg:w-[30%] h-[60%] rounded-lg lg:h-auto absolute lg:relative top-0 left-0 bg-[url('./assets/images/bg-sidebar-mobile.svg')] bg-cover bg-center bg-no-repeat text-white z-0 p-6">
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
        </div> */}
        <Nav />

        {/* Main Content */}
        <div className="lg:w-[70%] h-full w-full p-8 px-10 sm:px-20 absolute top-[20%] left-0 right-0 z-10 bg-white rounded-md mx-auto lg:relative lg:top-0">
          <div>
            <h1 className="text-[#012a5f] font-bold text-[10px] sm:text-[30px]">
              Pick Add-Ons
            </h1>
            <small className="text-[10px] text-gray-500 font-normal">
              Add-ons help enhance your gaming experience
            </small>
          </div>

          {/* Packages */}
          {/* <div className="flex flex-col gap-4 mt-6">
            {allAddOns.map((pkg) => (
              <ul
                key={pkg.id}
                className={`border rounded-lg px-1.5 py-2 sm:p-4 sm:w-[500px] w-[295px] cursor-pointer transition-all duration-200 ${
                  selectedAddons.includes(pkg.id)
                    ? "bg-purple-100 border-[#6259ff]"
                    : "border-gray-300"
                }`}
              >
                <li className="flex justify-between items-start gap-4">
                  <input
                    type="checkbox"
                    // checked={selectedAddons.includes(pkg.id)}
                    onChange={() => togglePackage(pkg)}
                    className="mt-1 w-4 accent-[#6259ff]"
                  />
                  <div className="flex-1">
                    <h2
                      onChange={() => togglePackage(pkg)}
                      className="text-[#012a5f] font-bold text-[14px] sm:text-[16px]"
                    >
                      {pkg.tag}
                    </h2>
                    <p className="text-[12px] text-gray-500">{pkg.details}</p>
                  </div>
                  <span className="text-[#6259ff] text-[10px] sm:text-[12px] whitespace-nowrap">
                    {`+${pkg.price}/mon`}
                  </span>
                </li>
              </ul>
            ))}
          </div> */}

          {allAddOns.map((pkg) => {
            const isSelected = selectedAddons.some(
              (item) => item.id === pkg.id
            );

            return (
              <ul
                key={pkg.id}
                className={`mb-4 border rounded-lg px-1.5 py-2 sm:p-4 sm:w-[500px] w-[295px] cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? "bg-purple-100 border-[#6259ff]"
                    : "border-gray-300"
                }`}
              >
                <li className="flex justify-between items-start gap-4">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => togglePackage(pkg)}
                    className="mt-1 w-4 accent-[#6259ff]"
                  />
                  <div className="flex-1">
                    <h2 className="text-[#012a5f] font-bold text-[14px] sm:text-[16px]">
                      {pkg.tag}
                    </h2>
                    <p className="text-[12px] text-gray-500">{pkg.details}</p>
                  </div>
                  <span className="text-[#6259ff] text-[10px] sm:text-[12px] whitespace-nowrap">
                    {`+${pkg.price}/mon`}
                  </span>
                </li>
              </ul>
            );
          })}

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
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddsOn;
