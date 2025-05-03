import { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { GlobalContext } from "../context/GlobalContext";

const Home = () => {
  const { activeStep, goToNextStep, goToStep, userInfo, setUserInfo } =
    useContext(GlobalContext);

  const steps = [
    { number: 1, label: "Your Info" },
    { number: 2, label: "Select Plan" },
    { number: 3, label: "ADD-ONS" },
    { number: 4, label: "Summary" },
  ];

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .matches(/^\+?[0-9\s\-]{7,15}$/, "Invalid phone number")
      .required("Phone number is required"),
  });

  const handleSubmit = (values) => {
    setUserInfo(values); // save form values to context
    goToNextStep(); // go to next step
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col lg:flex-row w-[90%] max-w-5xl h-[600px] p-5 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="side lg:w-[30%] w-full bg-cover rounded-lg bg-center flex flex-col sm:flex-row p-6 text-white">
          <ul className="flex flex-row space-6 items-center gap-4 lg:flex-col lg:items-start">
            {steps.map((step) => (
              <li
                key={step.number}
                className="flex items-center space-x-4 cursor-pointer"
                onClick={() => goToStep(step.number)}
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

        {/* Formik Form */}
        <div className="lg:w-[70%] w-full p-8">
          <h2 className="text-2xl font-bold mb-4">Personal Info</h2>
          <p className="text-gray-600 mb-6">
            Please provide your name, email address, and phone number.
          </p>

          <Formik
            initialValues={userInfo}
            validationSchema={validationSchema}
            enableReinitialize
            onSubmit={handleSubmit}
          >
            <Form className="flex flex-col gap-y-6">
              <div>
                <label className="text-black">Name</label>
                <Field
                  name="name"
                  type="text"
                  placeholder="e.g. Stephen King"
                  className="w-full border p-2 rounded mt-1"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="text-black">Email Address</label>
                <Field
                  name="email"
                  type="email"
                  placeholder="e.g. stephenking@lorem.com"
                  className="w-full border p-2 rounded mt-1"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="text-black">Phone Number</label>
                <Field
                  name="phone"
                  type="text"
                  placeholder="e.g. +1 234 567 890"
                  className="w-full border p-2 rounded mt-1"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <button
                type="submit"
                className="next fixed bottom-10 sm:bottom-6 right-[50px] sm:right-[200px] mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Next
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Home;
