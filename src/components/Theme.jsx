import React, { useEffect, useMemo, useRef, useState } from "react";

export default function Theme() {
    const [isDarkTheme, setIsDarkTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        return (savedTheme === 'dark');
    });

    useEffect(() => {
        const theme = isDarkTheme ? 'dark' : 'light';
        document.documentElement.setAttribute("data-theme", theme);
        const bg_img = isDarkTheme ? '/dark-bg.svg' : 'bg.svg';
        document.body.style.backgroundImage = `url(${bg_img})`;
    }, [isDarkTheme]);

    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    };

    useEffect(() => {
        const theme = isDarkTheme ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
    }, [isDarkTheme])


    return (
        <>
            <div onClick={toggleTheme}>
                {isDarkTheme ? <span>Light</span> : <span>Dark</span>}
            </div>
        </>
    );
}
