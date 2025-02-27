import { useState, useEffect } from "react";
import { addCustomer, updateCustomer } from "../utils/api";

const CustomerFormModal = ({ isOpen, onClose, onSave, token, customer }) => {
  if (!isOpen) return null; // Hide modal when closed

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let res = {};
    if (customer) {
      res = await updateCustomer({
        id: customer._id,
        ...formData,
        token,
      });
    } else {
      res = await addCustomer({
        ...formData,
        token,
      });
    }

    const { success, message, data } = res;
    if (success) {
      onSave(data);
      setFormData({ name: "", email: "", phone: "", address: "" }); // Reset form
      onClose(); // Close modal
    } else console.error(message);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-10 backdrop-blur-xs">
      <div className="bg-white p-6 rounded-lg shadow-2xl w-96">
        <h2 className="text-lg font-semibold mb-4">
          {customer ? "Edit Customer" : "Create Customer"}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
            placeholder="Name"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
            placeholder="Email"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded mb-2"
          />
          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded mb-2"
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              {customer ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerFormModal;
