import { Outlet } from "react-router-dom";
import Header from "../../Header/Header";

function DefaultLayout() {
    return (
        <div>
            <Header/>
            <Outlet></Outlet>
            
        </div>
      );
}

export default DefaultLayout;