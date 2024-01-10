import { Route, Routes, Navigate } from "react-router-dom";
import Header from "./componets/Header";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { useAuth } from "./hooks/use-auth";
import { Toaster } from "react-hot-toast";
import Footer from "./componets/Footer";
import Home from "./pages/Home";
import { pathes } from "./utils";

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
          {pathes.map(({ path, element }) => (
            <Route
              key={path}
              path={path}
              element={isAuth ? element : <Navigate to="/login" />}
            />
          ))}
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
