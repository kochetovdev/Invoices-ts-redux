import { Link } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import Spinner from "./Spinner";
import { useEffect, useRef, useState } from "react";

interface Props {
  loading: boolean;
  visibleMenu: boolean;
  logout: () => Promise<void>;
}

const MobileNav = ({ loading, visibleMenu, logout }: Props) => {
  const { isAuth, email } = useAuth();

  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.clientHeight);
    }
  }, [visibleMenu]);

  return (
    <article
      style={{
        transition: "height 0.5s ease-in-out",
        height: visibleMenu ? `${contentHeight}px` : "0",
        overflow: "hidden",
      }}
      className="absolute flex flex-col items-center top-full w-full right-0 bg-lime-400"
    >
      <div ref={contentRef} className="w-full">
        {isAuth && (
          <div className="hover:bg-amber-600 w-full flex justify-center transition-colors">
            <Link to="/invoices" className="text-gray-700 hover:text-gray-900">
              Invoices
            </Link>
          </div>
        )}
        <div className="hover:bg-amber-600 flex w-full justify-center transition-colors">
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
        <div className="hover:bg-amber-600 w-full flex justify-center transition-colors">
          {!isAuth && (
            <Link
              to="/registration"
              className="text-gray-700 hover:text-gray-900"
            >
              Registration
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};

export default MobileNav;
