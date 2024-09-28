import React from "react";
import Theme from "./Theme";

export default function Navbar() {
    return (
        <nav className="navbar flex justify-between w-auto py-2">
            <div className="cursor-pointer font-bold text-lg mx-5">TaskMater</div>
            <ul className='flex gap-5 mx-5'>
                <li className="cursor-pointer hover:font-bold transition-all">Home</li>
                <li className="cursor-pointer hover:font-bold transition-all">Your Tasks</li>
                <li className="cursor-pointer hover:font-bold transition-all"><Theme /></li>
            </ul>
        </nav>
    );
}