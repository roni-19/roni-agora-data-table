import React from "react";
import { Switch, Typography } from "antd";
import { MoonIcon } from "@heroicons/react/20/solid";
import { SunIcon } from "@heroicons/react/24/solid";

export default function PageHeader({ handleThemeChange }: { handleThemeChange: () => void }) {
    return (
        <div className="flex gap-2 items-center justify-between p-2">
            <div className="flex items-center gap-2">
                <img width={100} src="/marvel-logo-transparent.png" alt="logo"/>
                <Typography.Title style={{ margin: 0 }} level={2}>Marvel Cinematic Universe Movies</Typography.Title>
            </div>
            <Switch
                onClick={handleThemeChange}
                checkedChildren={<MoonIcon className="w-4 h-4 mt-[3px]"/>}
                unCheckedChildren={<SunIcon className="h-4 w-4 mt-[0.5px]"/>}/>
        </div>
    )
}