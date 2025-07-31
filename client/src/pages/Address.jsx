import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Address = () => {
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  // Axios API
  const { axios, user, navigate } = useContext(AppContext);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const submitHanlder = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/address/add", { address });
      if (data.success) {
        toast.success(data.message);
        navigate("/cart");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Failed to add address");
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/cart");
    }
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-6 items-stretch">
        {/* Form - 50% width on large screen */}
        <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow min-h-[450px] flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Address Details
            </h2>
            <form onSubmit={submitHanlder} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={address.firstName}
                  onChange={handleChange}
                  className="w-full border border-gray-600 focus:border-primary-dark hover:border-primary-dark focus:ring-1 focus:ring-primary-dark p-2 rounded-md text-sm outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={address.lastName}
                  onChange={handleChange}
                  className="w-full border border-gray-600 focus:border-primary-dark hover:border-primary-dark focus:ring-1 focus:ring-primary-dark p-2 rounded-md text-sm outline-none"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm text-gray-600">Email</label>
                <input
                  type="email"
                  name="email"
                  value={address.email}
                  onChange={handleChange}
                  className="w-full border border-gray-600 focus:border-primary-dark hover:border-primary-dark focus:ring-1 focus:ring-primary-dark p-2 rounded-md text-sm outline-none"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm text-gray-600">Street</label>
                <input
                  type="text"
                  name="street"
                  value={address.street}
                  onChange={handleChange}
                  className="w-full border border-gray-600 focus:border-primary-dark hover:border-primary-dark focus:ring-1 focus:ring-primary-dark p-2 rounded-md text-sm outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">City</label>
                <input
                  type="text"
                  name="city"
                  value={address.city}
                  onChange={handleChange}
                  className="w-full border border-gray-600 focus:border-primary-dark hover:border-primary-dark focus:ring-1 focus:ring-primary-dark p-2 rounded-md text-sm outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">State</label>
                <input
                  type="text"
                  name="state"
                  value={address.state}
                  onChange={handleChange}
                  className="w-full border border-gray-600 focus:border-primary-dark hover:border-primary-dark focus:ring-1 focus:ring-primary-dark p-2 rounded-md text-sm outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Zip Code</label>
                <input
                  type="number"
                  name="zipCode"
                  value={address.zipCode}
                  onChange={handleChange}
                  className="w-full border border-gray-600 focus:border-primary-dark hover:border-primary-dark focus:ring-1 focus:ring-primary-dark p-2 rounded-md text-sm outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Country</label>
                <input
                  type="text"
                  name="country"
                  value={address.country}
                  onChange={handleChange}
                  className="w-full border border-gray-600 focus:border-primary-dark hover:border-primary-dark focus:ring-1 focus:ring-primary-dark p-2 rounded-md text-sm outline-none"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm text-gray-600">Phone</label>
                <input
                  type="number"
                  name="phone"
                  value={address.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-600 focus:border-primary-dark hover:border-primary-dark focus:ring-1 focus:ring-primary-dark p-2 rounded-md text-sm outline-none"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-dark text-white py-2 rounded-md"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Image - 50% width on large screen */}
        <div className="w-full lg:w-1/2 flex justify-center items-center min-h-[450px]">
          <img
            src={assets.add_address_iamge}
            alt="Address Illustration"
            className="w-full max-w-[400px] object-contain rounded-md shadow h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Address;
