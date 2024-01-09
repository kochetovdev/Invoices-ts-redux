import { Link } from "react-router-dom";
import Spinner from "./Spinner";
import { useAuth } from "../hooks/use-auth";

interface Props {
  loading: boolean;
  logout: () => Promise<void>;
}

const DesktopNav = ({ loading, logout }: Props) => {
  const { isAuth, email } = useAuth();
  return (
    <article className="space-x-6 cursor-pointer hidden sm:flex">
      {isAuth && (
        <div>
          <Link to="/invoices" className="text-gray-700 hover:text-gray-900">
            Invoices
          </Link>
        </div>
      )}
      <div>
        {!isAuth && (
          <Link to="/login" className="text-gray-700 hover:text-gray-900">
            Login
          </Link>
        )}
        {isAuth && (
          <div onClick={logout} className="text-gray-700 hover:text-gray-900">
            {loading && <Spinner />}
            {!loading && email}
          </div>
        )}
      </div>
      <div>
        {!isAuth && (
          <Link
            to="/registration"
            className="text-gray-700 hover:text-gray-900"
          >
            Registration
          </Link>
        )}
      </div>
    </article>
  );
};

export default DesktopNav;
