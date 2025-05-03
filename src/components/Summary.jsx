import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";

const Summary = () => {
  const {
    activeStep,
    activePlan,
    billingType,
    selectedAddons,
    goToNextStep,
    goToPreviousStep,
    // newTotalCost,
    getTotal,
  } = useContext(GlobalContext);

  // console.log(newTotalCost);

  console.log("Total Price (Plan + Add-ons):", getTotal());

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const steps = [
    { number: 1, label: "Your Info", path: "/" },
    { number: 2, label: "Select Plan", path: "/about" },
    { number: 3, label: "Add-Ons", path: "/addons" },
    { number: 4, label: "Summary", path: "/summary" },
  ];

  const handleBack = () => goToPreviousStep();

  const confirmAndProceed = () => {
    goToNextStep();
    navigate("/thanks");
  };

  const formatPrice = (price) =>
    billingType === "yearly" ? `+$${price * 12}/yr` : `+$${price}`;

  const formatPlanPrice = (price) =>
    billingType === "yearly" ? `$${price * 12}/yr` : `$${price}`;

  // const formatTotal = (price) =>
  //   billingType === "yearly" ? `$${price}/yr` : `$${price}`;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex flex-col lg:flex-row w-[90%] max-w-5xl h-[600px] p-5 bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Sidebar */}
        <div className="w-full lg:w-[30%] h-[60%] lg:h-auto absolute lg:relative top-0 left-0 bg-[url('./assets/images/bg-sidebar-mobile.svg')] bg-cover bg-center text-white p-6 z-0">
          <ul className="flex flex-row lg:flex-col gap-4 items-center lg:items-start">
            {steps.map((step) => (
              <li
                key={step.number}
                className="flex items-center space-x-4 cursor-pointer"
                onClick={() => navigate(step.path)}
              >
                <span
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold ${
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

        {/* Main Content */}
        <div className="lg:w-[70%] w-full p-8 px-10 sm:px-20 absolute top-[20%] lg:top-0 bg-white rounded-md mx-auto lg:relative z-10">
          <div>
            <h1 className="text-[#012a5f] font-bold text-[24px] sm:text-[30px]">
              Finishing Up
            </h1>
            <small className="text-[10px] text-gray-500">
              Double-check everything before confirming.
            </small>
          </div>

          {/* Summary Card */}
          <ul className="bg-gray-200 rounded-lg mt-5">
            {/* Plan */}
            <li className="flex justify-between items-center p-5 border-b border-gray-300">
              <div>
                <p className="text-[#012a5f] font-bold text-sm">
                  {activePlan?.name} ({billingType})
                </p>
                <button
                  onClick={() => navigate("/about")}
                  className="underline text-xs text-gray-500 mt-1"
                >
                  Change
                </button>
              </div>
              <span className="text-[#012a5f] font-bold text-sm">
                {formatPlanPrice(activePlan?.price || 0)}
              </span>
            </li>

            {/* Add-ons */}
            {selectedAddons.map((addon, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-5 border-b border-gray-300"
              >
                <small className="text-xs text-gray-500">{addon.name}</small>
                <span className="text-[#012a5f] font-bold text-sm">
                  {formatPrice(addon.price)}
                </span>
              </li>
            ))}

            {/* Total */}
            <li className="flex justify-between items-center p-5 bg-white rounded-b-lg">
              <small className="text-xs text-gray-500">Total</small>
              <span className="text-[#6259ff] font-bold text-sm">
                {`Total: ${getTotal()}`}
              </span>
            </li>
          </ul>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-10">
            <button
              onClick={handleBack}
              disabled={activeStep === 1}
              className="fixed bottom-10 sm:bottom-6 left-[50px] sm:left-[510px] bg-gray-200 text-gray-600 py-2 px-4 rounded hover:bg-white hover:text-[#012a5f] disabled:opacity-50"
            >
              Go Back
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="fixed bottom-10 sm:bottom-6 right-[50px] sm:right-[200px] bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
            <h2 className="text-lg font-semibold mb-4 text-[#012a5f]">
              Confirm Your Selections
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure about your selections? Click "Yes" to continue or
              "No" to review.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmAndProceed}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                Yes
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Summary;
