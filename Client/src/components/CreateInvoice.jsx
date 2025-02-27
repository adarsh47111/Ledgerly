import React, { useState } from "react";

// const CreateInvoice = () => {
//   return (
//     <div>CreateInvoice</div>
//   )
// }

// export default CreateInvoice;

const InvoiceTemplate = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const invoiceData = {
    company: {
      name: "Tech Solutions Inc.",
      address: "123 Business St, Suite 400",
      city: "New York, NY 10001",
      phone: "(123) 456-7890",
      email: "contact@techsolutions.com",
    },
    customer: {
      name: "John Doe",
      address: "456 Customer Rd, Apt 12",
      city: "Los Angeles, CA 90005",
      phone: "(987) 654-3210",
      email: "johndoe@email.com",
    },
    invoice: {
      id: "INV-2025001",
      date: "2025-02-27",
      dueDate: "2025-03-10",
    },
    items: [
      {
        description: "Web Development Service",
        quantity: 1,
        unitPrice: 1200.0,
      },
      { description: "Hosting (1 Year)", quantity: 1, unitPrice: 200.0 },
      { description: "Domain Name", quantity: 1, unitPrice: 15.0 },
    ],
    taxRate: 0.1, // 10% tax
  };

  return (
    <div className="max-w-7xl w-[50%] mx-auto p-8 bg-white shadow-lg rounded-lg">
      <Header invoiceData={invoiceData} />

      {/* Customer Info */}

      {/* Invoice Items */}
      <InvoiceSection invoiceData={invoiceData} />

      <Footer />
    </div>
  );
};

export default InvoiceTemplate;

const Header = ({ invoiceData, selectedCustomer, setSelectedCustomer }) => {
  const invoideId = invoiceData.invoice.id;
  const date = new Date().toISOString().split("T")[0];
  const dueDate = invoiceData.invoice.dueDate;

  const company = invoiceData.company;
  const customer = invoiceData.customer;
  //   const customer = null;
  const list = ["abc", "xyz"];

  return (
    <>
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Invoice</h1>
          <p className="text-gray-500">Invoice #: {invoideId}</p>
          <p className="text-gray-500">Date: {date}</p>
          <p className="text-gray-500">Due Date: {dueDate}</p>
        </div>
        <div className="text-right">
          <h2 className="text-xl font-semibold text-gray-700">
            {company.name}
          </h2>
          <p className="text-gray-500">{company.address}</p>
          <p className="text-gray-500">{company.city}</p>
          <p className="text-gray-500">{company.phone}</p>
          <p className="text-gray-500">{company.email}</p>
        </div>
      </div>

      <div className="border-b pb-4 mb-6">
        {!customer ? (
          <div>
            {/* dropdown to select customer */}
            <select
              className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md"
              //   onChange={(e) =>
              //     setSelectedCustomer(invoiceData.customer[e.target.value])
              //   }
              defaultValue=""
            >
              <option value="" disabled>
                Select Customer
              </option>
              {list.map((customer, index) => (
                <option key={index} value={index}>
                  {customer.name}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <>
            <div className="flex items-center">
              <h3 className="text-lg font-semibold text-gray-700">Bill To:</h3>
              <button
                className="ml-9 px-2 py-1 bg-blue-500 text-white text-xs border rounded-md cursor-pointer"
                onClick={() => alert("Change Customer")}
              >
                Change
              </button>
            </div>
            <p className="text-gray-500">{customer.name}</p>
            <p className="text-gray-500">{customer.address}</p>
            <p className="text-gray-500">{customer.city}</p>
            <p className="text-gray-500">{customer.phone}</p>
            <p className="text-gray-500">{customer.email}</p>
          </>
        )}
      </div>
    </>
  );
};

const Footer = () => {
  return (
    <div className="mt-6 text-gray-600 text-center">
      <p>Thank you for your business!</p>
      <button
        onClick={() => window.print()}
        className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
      >
        Print Invoice
      </button>
    </div>
  );
};

const InvoiceSection = ({ invoiceData }) => {
  // Calculate total amount
  const subtotal = invoiceData.items.reduce(
    (acc, item) => acc + item.quantity * item.unitPrice,
    0
  );
  const tax = subtotal * invoiceData.taxRate;
  const total = subtotal + tax;

  return (
    <>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="p-3 text-left">Description</th>
            <th className="p-3 text-center">Quantity</th>
            <th className="p-3 text-right">Unit Price</th>
            <th className="p-3 text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData.items.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="p-3">{item.description}</td>
              <td className="p-3 text-center">{item.quantity}</td>
              <td className="p-3 text-right">${item.unitPrice.toFixed(2)}</td>
              <td className="p-3 text-right">
                ${(item.quantity * item.unitPrice).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Total */}
      <div className="mt-6 flex justify-end">
        <table className="text-right">
          <tbody>
            <tr>
              <td className="px-4 py-2 text-gray-500">Subtotal:</td>
              <td className="px-4 py-2 font-semibold">
                ${subtotal.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-gray-500">Tax (10%):</td>
              <td className="px-4 py-2 font-semibold">${tax.toFixed(2)}</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="px-4 py-2 font-bold">Total:</td>
              <td className="px-4 py-2 font-bold text-xl">
                ${total.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
