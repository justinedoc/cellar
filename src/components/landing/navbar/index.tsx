import Logo from "@/components/globals/logo";
import NavActions from "./nav-actions";
import NavMenu from "./nav-menu";

function Navbar() {
  return (
    <nav className="fixed top-4 left-1/2 z-100 flex w-full max-w-[95%] -translate-x-1/2 justify-between rounded-md border px-2 py-2 backdrop-blur-2xl sm:max-w-[90%] md:max-w-[85%] md:items-center md:rounded-2xl md:py-1.5 2xl:max-w-[70%]">
      <Logo />

      <NavMenu />

      <NavActions />
    </nav>
  );
}

export default Navbar;
