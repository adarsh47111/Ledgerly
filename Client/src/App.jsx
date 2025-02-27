import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Invoices from "./components/Invoices";
import CreateInvoice from "./components/CreateInvoice";
import Customer from "./components/Customer";

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={}/> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />}>
          {/* <Route path="" element={} /> */}
          <Route path="invoice" element={<Invoices />} />
          <Route path="createInvoice" element={<CreateInvoice />} />
          <Route path="customer" element={<Customer />} />
          {/* <Route path="template" element={} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
