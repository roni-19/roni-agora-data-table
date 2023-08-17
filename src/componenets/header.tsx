import React from "react";

export default function Header() {
    return (
        <div className="flex gap-2 items-center">
            <img width={100} src="/marvel-logo-transparent.png" alt="logo"/>
            <div className="text-3xl">MCU Movies</div>
        </div>
    )
}