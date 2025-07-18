import React from "react";
import UserCard from "./UserCard";
import NavCard from "./NavCard";

function Navbar() {
    return (
        <div className="w-full sm:py-4 sm:flex sm:items-center sm:justify-center sm:px-4">
            {/* Both cards are hidden on small screens and shown from sm+ */}
            <div className="hidden sm:flex flex-row space-x-4">
                <NavCard />
                <UserCard email="khankhan23@gmail.com" />
            </div>
        </div>
    );
}

export default Navbar;
