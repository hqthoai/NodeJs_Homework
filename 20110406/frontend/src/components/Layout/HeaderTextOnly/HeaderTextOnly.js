import { Outlet } from "react-router-dom";
import Header from "../../Header/Header";

function HeaderTextOnly() {
    return (
        <div>
            <Header/>
            <Outlet></Outlet>
            
        </div>
      );
}

export default HeaderTextOnly;