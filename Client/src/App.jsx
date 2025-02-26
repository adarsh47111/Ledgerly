import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={}/> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/dashboard" element={<Dashboard/>}>
            <Route path="" element={} />
            <Route path="/invoice" element={} />
            <Route path="/customer" element={} />
            <Route path="/template" element={} />
          </Route> */}
      </Routes>
    </>
  );
}

export default App;
