import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Invoices from "./components/Invoices";

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
          {/* <Route path="customer" element={} /> */}
          {/* <Route path="template" element={} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
