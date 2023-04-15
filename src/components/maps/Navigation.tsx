import {Route, Routes} from "react-router";
import {NewMap} from "./creation/NewMap";
import {MarsView} from "./rover/MarsView";

export function Navigation() {
    return (
        <Routes>
            <Route path={"/"} Component={NewMap}/>
            <Route path={"/map"} Component={MarsView}/>
        </Routes>
    );
}
