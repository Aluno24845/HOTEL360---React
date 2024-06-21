import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";

export default function AppLayout() {
    return (
        <>
            <Header />
            <div className="h-full grid grid-cols-[1fr_3fr] w-full ">
                <Sidebar />
                <div className="bg-gray-50 p-16 pb-24 ">
                    <Outlet />
                </div>
            </div>
        </>
    );
}
