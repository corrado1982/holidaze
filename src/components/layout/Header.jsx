import UserNav from "./nav/UserNav";
import { isItLogged } from "../isItLogged";
import LoggedNav from "./nav/LoggedNav";

function Header() {
  return (
    <header className=" mb-12">
      <div>{isItLogged() ? <LoggedNav /> : <UserNav />}</div>
    </header>
  );
}

export default Header;
