import UserNav from "./nav/UserNav";
import { isItLogged } from "../isItLogged";
import LoggedNav from "./nav/LoggedNav";

function Header() {
  return (
    <header>
      <div>Header with Logo and nav</div>
      <div>{isItLogged() ? <LoggedNav /> : <UserNav />}</div>
    </header>
  );
}
// console.log(isItLogged());

export default Header;
