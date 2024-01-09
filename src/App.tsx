import { Route, Routes, Navigate } from "react-router-dom";
import Header from "./componets/Header";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import InvoicesList from "./pages/InvoicesList";
import { useAuth } from "./hooks/use-auth";
import { Toaster } from "react-hot-toast";
import InvoicesDetails from "./componets/InvoicesDetails";
import InvoiceCreateItem from "./componets/InvoiceCreateItem";
import Footer from "./componets/Footer";
import Home from "./pages/Home";

function App() {
  const { isAuth } = useAuth();
  return (
    <article className="relative h-full min-h-screen">
      <Header />
      <main className="max-w-[1400px] mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route
            path="/invoices"
            element={isAuth ? <InvoicesList /> : <Navigate to="/login" />}
          />
          <Route
            path="invoices/create"
            element={isAuth ? <InvoiceCreateItem /> : <Navigate to="/login" />}
          />
          <Route
            path="/invoices/:id"
            element={isAuth ? <InvoicesDetails /> : <Navigate to="/login" />}
          />
          <Route
            path="*"
            element={
              <h1 className="text-center text-2xl font-bold">Not Found Page</h1>
            }
          />
        </Routes>
      </main>
      <Footer />
      <Toaster />
    </article>
  );
}

export default App;
