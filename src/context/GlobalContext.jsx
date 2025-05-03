import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [activeStep, setActiveStep] = useState(1);
  const [activePlan, setActivePlan] = useState([]);
  const [billingType, setBillingType] = useState("monthly");
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const navigate = useNavigate();

  const steps = [
    { number: 1, path: "/" },
    { number: 2, path: "/about" },
    { number: 3, path: "/addons" },
    { number: 4, path: "/summary" },
    { number: 5, path: "/thanks" },
  ];

  //   const getTotal = () => {
  //     const addonsTotal = selectedAddons.reduce((total, addon) => {
  //       return total + Number(addon.price);
  //     }, 0);

  //     const planPrice = Number(activePlan?.price || 0);

  //     return addonsTotal + planPrice;
  //   };
  const getTotal = () => {
    const multiplier = billingType === "yearly" ? 12 : 1;

    const addonsTotal = selectedAddons.reduce((total, addon) => {
      return total + Number(addon.price) * multiplier;
    }, 0);

    const planPrice = Number(activePlan?.price || 0) * multiplier;

    return `$${addonsTotal + planPrice}/${
      billingType === "yearly" ? "yr" : "mo"
    }`;
  };

  const allAddOns = [
    {
      id: 1,
      tag: "Online Service",
      details: "Access to multiplayer games",
      price: 1,
    },
    {
      id: 2,
      tag: "Large Storage",
      details: "Extra 1 TB of cloud save",
      price: 2,
    },
    {
      id: 3,
      tag: "Customizable Profile",
      details: "Custom Theme on your profile",
      price: 2,
    },
  ];

  const goToNextStep = () => {
    const nextStep = activeStep + 1;
    if (nextStep <= steps.length) {
      setActiveStep(nextStep);
      const nextRoute = steps.find((step) => step.number === nextStep)?.path;
      if (nextRoute) navigate(nextRoute);
    }
  };

  const goToPreviousStep = () => {
    const prevStep = activeStep - 1;
    if (prevStep >= 1) {
      setActiveStep(prevStep);
      const prevRoute = steps.find((step) => step.number === prevStep)?.path;
      if (prevRoute) navigate(prevRoute);
    }
  };

  const goToStep = (stepNumber) => {
    const found = steps.find((step) => step.number === stepNumber);
    if (found) {
      setActiveStep(stepNumber);
      navigate(found.path);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        allAddOns,
        activeStep,
        setActiveStep,
        activePlan,
        setActivePlan,
        billingType,
        setBillingType,
        selectedAddons,
        setSelectedAddons,
        goToNextStep,
        goToPreviousStep,
        goToStep,
        steps,
        userInfo,
        setUserInfo,
        getTotal,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };
