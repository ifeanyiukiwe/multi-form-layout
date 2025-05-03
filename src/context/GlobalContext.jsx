import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [activeStep, setActiveStep] = useState(1);
  const [activePackage, setActivePackage] = useState([]); // IDs of selected addons
  const [activePlan, setActivePlan] = useState({}); // Plan is an object
  const [billingType, setBillingType] = useState("monthly");
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
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

  const allAddOns = [
    { id: 1, name: "Online Service", price: 1 },
    { id: 2, name: "Large Storage", price: 2 },
    { id: 3, name: "Customizable Profile", price: 2 },
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

  // Pure cost calculator function
  const getTotalCost = () => {
    // Start with the plan's base price
    let cost =
      billingType === "yearly"
        ? (activePlan?.price || 0) * 12
        : activePlan?.price || 0;

    // Addons total adjusted for billing type
    const addonsCost = selectedAddons.reduce((sum, addon) => {
      const addonPrice =
        billingType === "yearly" ? addon.price * 12 : addon.price;
      return sum + addonPrice;
    }, 0);

    const sumtotal = cost + addonsCost;

    console.log("Plan cost:", cost);
    console.log("Addons cost:", addonsCost);
    console.log("Total:", sumtotal);

    return sumtotal;
  };

  const newTotalCost = getTotalCost();

  // Set total cost state
  const calculateTotalCost = () => {
    const cost = getTotalCost();
    setTotalCost(cost);
  };

  // Update selectedAddons when activePackage changes
  useEffect(() => {
    const selected = allAddOns.filter((addon) =>
      activePackage.includes(addon.id)
    );
    setSelectedAddons(selected);
  }, [activePackage]);

  // Recalculate total cost when activePlan, billingType, or selectedAddons change
  useEffect(() => {
    calculateTotalCost();
  }, [activePlan, billingType, selectedAddons]);

  return (
    <GlobalContext.Provider
      value={{
        activeStep,
        setActiveStep,
        activePackage,
        setActivePackage,
        activePlan,
        setActivePlan,
        billingType,
        setBillingType,
        selectedAddons,
        setSelectedAddons,
        totalCost,
        goToNextStep,
        goToPreviousStep,
        goToStep,
        steps,
        userInfo,
        setUserInfo,
        getTotalCost,
        newTotalCost, // Expose this for instant use without relying on state
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };
