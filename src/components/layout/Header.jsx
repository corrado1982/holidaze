import UserNav from "./nav/UserNav";
import { isItLogged } from "../isItLogged";

function Header() {
  return (
    <header>
      <div>Header with Logo and nav</div>
      <UserNav />
    </header>
  );
}
console.log(isItLogged());

export default Header;
