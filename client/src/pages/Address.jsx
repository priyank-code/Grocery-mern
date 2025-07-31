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

  const { axios, user, navigate } = useContext(AppContext);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const submitHanlder = async (e) => {
    try {
      e.preventDefault();
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
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      {/* Form */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center sm:text-left">
          Address Details
        </h2>
        <form
          onSubmit={submitHanlder}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <div>
            <label className="block text-gray-600 text-sm mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              value={address.firstName}
              onChange={handleChange}
              className="w-full p-2 border rounded-md text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={address.lastName}
              onChange={handleChange}
              className="w-full p-2 border rounded-md text-sm"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-gray-600 text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={address.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-md text-sm"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-gray-600 text-sm mb-1">Street</label>
            <input
              type="text"
              name="street"
              value={address.street}
              onChange={handleChange}
              className="w-full p-2 border rounded-md text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-1">City</label>
            <input
              type="text"
              name="city"
              value={address.city}
              onChange={handleChange}
              className="w-full p-2 border rounded-md text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-1">State</label>
            <input
              type="text"
              name="state"
              value={address.state}
              onChange={handleChange}
              className="w-full p-2 border rounded-md text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-1">Zip Code</label>
            <input
              type="number"
              name="zipCode"
              value={address.zipCode}
              onChange={handleChange}
              className="w-full p-2 border rounded-md text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-1">Country</label>
            <input
              type="text"
              name="country"
              value={address.country}
              onChange={handleChange}
              className="w-full p-2 border rounded-md text-sm"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-gray-600 text-sm mb-1">Phone</label>
            <input
              type="number"
              name="phone"
              value={address.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded-md text-sm"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm"
            >
              Save Address
            </button>
          </div>
        </form>
      </div>

      {/* Image */}
      <div className="flex justify-center">
        <img
          src={assets.add_address_iamge}
          alt="Address Illustration"
          className="w-full max-w-[300px] sm:max-w-[400px] object-contain rounded-md shadow"
        />
      </div>
    </div>
  );
};

export default Address;
