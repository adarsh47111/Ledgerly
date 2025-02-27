import { Delete, Edit, Search } from "lucide-react";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Invoices = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const invoicesPerPage = 5;

  const invoices = [
    {
      id: "#1008",
      customer: "David Smith",
      issueDate: "15Jan2025",
      dueDate: "20 Jan 2025",
      amount: "$3,500.40",
      status: "Paid",
    },
    {
      id: "#1007",
      customer: "Jane Cooper",
      issueDate: "12 Jan 2025",
      dueDate: "16 Jan 2025",
      amount: "$2,576.28",
      status: "Pending",
    },
    {
      id: "#1006",
      customer: "Kristin Watson",
      issueDate: "11 Jan 2025",
      dueDate: "13 Jan 2025",
      amount: "$1,475.22",
      status: "Overdue",
    },
    {
      id: "#1005",
      customer: "Savannah Nguyen",
      issueDate: "11 Jan 2025",
      dueDate: "15 Jan 2025",
      amount: "$2,576.28",
      status: "Paid",
    },
    {
      id: "#1004",
      customer: "Esther Howard",
      issueDate: "11 Jan 2025",
      dueDate: "20 Jan 2025",
      amount: "$1,948.55",
      status: "Paid",
    },
    {
      id: "#1003",
      customer: "Brooklyn Sions",
      issueDate: "10 Jan 2025",
      dueDate: "20 Jan 2025",
      amount: "$3,105.55",
      status: "Pending",
    },
    {
      id: "#1002",
      customer: "Marvin McKinney",
      issueDate: "10 Jan 2025",
      dueDate: "12 Jan 2025",
      amount: "$2,490.51",
      status: "Overdue",
    },
    {
      id: "#1001",
      customer: "Jacob Jones",
      issueDate: "10 Jan 2025",
      dueDate: "20 Jan 2025",
      amount: "$1,202.87",
      status: "Pending",
    },
  ];

  const indexOfLastInvoice = currentPage * invoicesPerPage;
  const indexOfFirstInvoice = indexOfLastInvoice - invoicesPerPage;
  const currentInvoices = invoices.slice(
    indexOfFirstInvoice,
    indexOfLastInvoice
  );

  return (
    <div className="p-4 font-sans w-full">
      {/* search bar and create invoice button */}
      <div className="flex justify-between items-center my-3">
        <div className="flex items-center border border-[#979797] rounded-md p-2 mr-2">
          <Search size={20} color="#979797" />
          <input
            className="pl-2 focus:outline-none placeholder:font-semibold"
            type="text"
            placeholder="Search invoices by Id"
          />
        </div>
        <button className="border-2 rounded-md p-2 text-white bg-gray-800 hover:bg-gray-600 cursor-pointer">
          <NavLink to="/dashboard/createInvoice">Create Invoice</NavLink>
        </button>
      </div>
      <InvoiceTable {...{ currentInvoices }} />
      <Pagination
        {...{
          invoicesPerPage,
          indexOfFirstInvoice,
          indexOfLastInvoice,
          invoices,
          currentPage,
          setCurrentPage,
        }}
      />
    </div>
  );
};

export default Invoices;

const InvoiceTable = ({ currentInvoices }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-3 px-6 text-left">Invoice ID</th>
            <th className="py-3 px-6 text-left">Customer Name</th>
            <th className="py-3 px-6 text-left">Issue Date</th>
            <th className="py-3 px-6 text-left">Due Date</th>
            <th className="py-3 px-6 text-left">Amount</th>
            <th className="py-3 px-6 text-left">Status</th>
            <th className="py-3 px-6 text-left">Edit</th>
            <th className="py-3 px-6 text-left">Delete</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {currentInvoices.map((invoice, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="py-3 px-6 border-b border-gray-200">
                {invoice.id}
              </td>
              <td className="py-3 px-6 border-b border-gray-200">
                {invoice.customer}
              </td>
              <td className="py-3 px-6 border-b border-gray-200">
                {invoice.issueDate}
              </td>
              <td className="py-3 px-6 border-b border-gray-200">
                {invoice.dueDate}
              </td>
              <td className="py-3 px-6 border-b border-gray-200">
                {invoice.amount}
              </td>
              <td className="py-3 px-6 border-b border-gray-200">
                <span
                  className={`px-3 py-1 text-sm rounded-full ${
                    invoice.status === "Paid"
                      ? "bg-green-100 text-green-700"
                      : invoice.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {invoice.status}
                </span>
              </td>
              <td className="py-3 px-6 border-b border-gray-200">
                <button className="hover:text-blue-800 cursor-pointer">
                  <Edit size={20} />
                </button>
              </td>
              <td className="py-3 px-6 border-b border-gray-200">
                <button className="hover:text-blue-800 cursor-pointer">
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
  invoicesPerPage,
  indexOfFirstInvoice,
  indexOfLastInvoice,
  invoices,
  currentPage,
  setCurrentPage,
}) => {
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex justify-between items-center mt-4">
      <span className="text-gray-700">
        Showing {indexOfFirstInvoice + 1} to{" "}
        {Math.min(indexOfLastInvoice, invoices.length)} of {invoices.length}{" "}
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
        {[...Array(Math.ceil(invoices.length / invoicesPerPage)).keys()].map(
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
            currentPage === Math.ceil(invoices.length / invoicesPerPage)
          }
          className="px-4 py-2 border rounded bg-gray-800 hover:bg-gray-600 text-white disabled:bg-gray-300 cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};
