import { Delete, Edit, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { addCustomer, deleteCustomer, getAllCustomers } from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import CustomerFormModal from "./CustomerFormModel";
import { removeCustomer, setCustomers } from "../redux/customerSlice";

const Customer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 5;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const token = useSelector((state) => state.user.accessToken);
  const dispatch = useDispatch();
  const customers = useSelector((state) => {
    return state.customers.customerList;
  });

  const handleSave = (updatedCustomer) => {
    if (selectedCustomer) {
      // Update customer
      const updatedCustomers = customers.map((c) =>
        c._id === selectedCustomer._id ? { ...c, ...updatedCustomer } : c
      );
      dispatch(setCustomers(updatedCustomers));
    } else {
      // Create new customer
      dispatch(setCustomers([...customers, { ...updatedCustomer }]));
    }
    setIsModalOpen(false);
  };

  const openCreateModal = () => {
    setSelectedCustomer(null); // Reset form
    setIsModalOpen(true);
  };

  const openEditModal = (customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  const customersa = [
    {
      id: "C1008",
      name: "David Smith",
      email: "david@example.com",
      phone: "123-456-7890",
      address: "New York, USA",
      status: "Active",
    },
    {
      id: "C1007",
      name: "Jane Cooper",
      email: "jane@example.com",
      phone: "987-654-3210",
      address: "California, USA",
      status: "Inactive",
    },
    {
      id: "C1006",
      name: "Kristin Watson",
      email: "kristin@example.com",
      phone: "555-666-7777",
      address: "Texas, USA",
      status: "Active",
    },
    {
      id: "C1005",
      name: "Savannah Nguyen",
      email: "savannah@example.com",
      phone: "444-555-6666",
      address: "Florida, USA",
      status: "Active",
    },
    {
      id: "C1004",
      name: "Esther Howard",
      email: "esther@example.com",
      phone: "333-444-5555",
      address: "Washington, USA",
      status: "Inactive",
    },
  ];

  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = customers?.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );

  useEffect(() => {
    (async () => {
      const { success, message, data } = await getAllCustomers({ token });
      if (success) dispatch(setCustomers(data));
      else console.error(message);
    })();
  }, []);

  return (
    <div className="p-4 font-sans w-full">
      <div className="flex justify-between items-center my-3">
        <div className="flex items-center border border-[#979797] rounded-md p-2 mr-2">
          <Search size={20} color="#979797" />
          <input
            className="pl-2 focus:outline-none placeholder:font-semibold"
            type="text"
            placeholder="Search customers"
          />
        </div>

        <button
          className="border-2 rounded-md p-2 text-white bg-gray-800 hover:bg-gray-600 cursor-pointer"
          onClick={openCreateModal}
        >
          Add Customer
        </button>
        <CustomerFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          customer={selectedCustomer}
          token={token}
        />
      </div>

      <CustomerTable {...{ currentCustomers, openEditModal, token }} />
      <Pagination
        {...{
          customersPerPage,
          indexOfFirstCustomer,
          indexOfLastCustomer,
          customers,
          currentPage,
          setCurrentPage,
        }}
      />
    </div>
  );
};

export default Customer;

const CustomerTable = ({ currentCustomers, openEditModal, token }) => {
  const dispatch = useDispatch();

  const handleDeleteCustomer = async (id) => {
    const { success, message, data } = await deleteCustomer({ id, token });
    if (success) dispatch(removeCustomer({ id }));
    else console.error(message);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-3 px-6 text-left">Customer ID</th>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Phone</th>
            <th className="py-3 px-6 text-left">Address</th>
            <th className="py-3 px-6 text-left">Edit</th>
            <th className="py-3 px-6 text-left">Delete</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {currentCustomers.map((customer, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="py-3 px-6 border-b border-gray-200">
                {customer._id}
              </td>
              <td className="py-3 px-6 border-b border-gray-200">
                {customer.name}
              </td>
              <td className="py-3 px-6 border-b border-gray-200">
                {customer.email}
              </td>
              <td className="py-3 px-6 border-b border-gray-200">
                {customer.phone}
              </td>
              <td className="py-3 px-6 border-b border-gray-200">
                {customer.address}
              </td>
              <td className="py-3 px-6 border-b border-gray-200">
                <button
                  className="hover:text-blue-800 cursor-pointer"
                  onClick={() => openEditModal(customer)}
                >
                  <Edit size={20} />
                </button>
              </td>
              <td className="py-3 px-6 border-b border-gray-200">
                <button
                  className="hover:text-blue-800 cursor-pointer"
                  onClick={() => handleDeleteCustomer(customer._id)}
                >
                  <Delete size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Pagination = ({
  customersPerPage,
  indexOfFirstCustomer,
  indexOfLastCustomer,
  customers,
  currentPage,
  setCurrentPage,
}) => {
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex justify-between items-center mt-4">
      <span className="text-gray-700">
        Showing {indexOfFirstCustomer + 1} to{" "}
        {Math.min(indexOfLastCustomer, customers.length)} of {customers.length}{" "}
        results
      </span>
      <div className="flex space-x-2">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded bg-gray-800 hover:bg-gray-600 text-white disabled:bg-gray-300 cursor-pointer"
        >
          Previous
        </button>
        {[...Array(Math.ceil(customers.length / customersPerPage)).keys()].map(
          (number) => (
            <button
              key={number + 1}
              onClick={() => paginate(number + 1)}
              className={`px-4 py-2 border rounded cursor-pointer ${
                currentPage === number + 1
                  ? "bg-gray-800 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              {number + 1}
            </button>
          )
        )}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={
            currentPage === Math.ceil(customers.length / customersPerPage)
          }
          className="px-4 py-2 border rounded bg-gray-800 hover:bg-gray-600 text-white disabled:bg-gray-300 cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};
