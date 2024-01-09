import { FC, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { removeUser } from "../store/slices/userSlice";
import delay from "delay";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

const Header: FC = () => {
  const [loading, setLoading] = useState(false);
  const [visibleMenu, setVisibleMenu] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const menuRef = useRef<HTMLDivElement>(null);

  const logout = async () => {
    setLoading(true);
    await delay(1000);
    dispatch(removeUser());
    localStorage.clear();
    setLoading(false);
    toast("You are successfully logged out");
    navigate("/");
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setVisibleMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <header className="relative mb-8 flex items-center shadow-md h-20 text-lg bg-gradient-to-r from-lime-500 to-green-500">
      <div className="w-[1400px] mx-6 2xl:mx-auto">
        <nav className="flex justify-between font-semibold">
          <div className="flex cursor-pointer">
            <div className="flex items-center mr-5">
              <img
                className="h-5 w-5 rounded-sm"
                src="/icon-1.png"
                alt="icon-logo"
              />
            </div>
            <div className="text-gray-700 hover:text-gray-900">
              <Link to="/">Home</Link>
            </div>
          </div>
          <DesktopNav loading={loading} logout={logout} />
          <div
            className="flex items-center sm:hidden cursor-pointer"
            ref={menuRef}
          >
            <GiHamburgerMenu
              onClick={() => setVisibleMenu(!visibleMenu)}
              className="text-2xl"
            />
            <MobileNav
              visibleMenu={visibleMenu}
              loading={loading}
              logout={logout}
            />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
