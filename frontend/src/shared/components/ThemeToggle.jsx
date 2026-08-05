import { useEffect, useState } from "react";

import { FaMoon, FaSun } from "react-icons/fa";

import "../styles/ThemeToggle.scss";

export default function ThemeToggle() {

    const [dark, setDark] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {

        if (dark) {

            document.documentElement.classList.remove("light-theme");
            document.documentElement.classList.add("dark-theme");

            localStorage.setItem("theme", "dark");

        } else {

            document.documentElement.classList.remove("dark-theme");
            document.documentElement.classList.add("light-theme");

            localStorage.setItem("theme", "light");
        }

    }, [dark]);

    return (

        <div
            className={`theme-toggle ${dark ? "dark" : ""}`}
            onClick={() => setDark(prev => !prev)}
        >

            <FaSun className="sun"/>

            <FaMoon className="moon"/>

            <div className="thumb"/>

        </div>

    );
}