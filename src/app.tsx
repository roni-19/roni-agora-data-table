import React from "react";
import AgoraDatatable from "./componenets/agora-datatable";
import PageHeader from "./componenets/page-header";
import { useState } from "react";
import { ConfigProvider, theme } from "antd";
import clsx from "clsx";

function App() {
    const { defaultAlgorithm, darkAlgorithm } = theme;
    const [isDarkMode, setIsDarkMode] = useState(false);
    const handleThemeChange = () => {
        setIsDarkMode((previousValue) => !previousValue);
    };

    return (
        <ConfigProvider
            theme={{ algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm }}
        >
            <div className={clsx("flex flex-col p-4 h-full", isDarkMode ? "bg-[#212121]" : "bg-gray-100")}>
                <PageHeader handleThemeChange={handleThemeChange}/>
                <div className="px-4">
                    <AgoraDatatable/>
                </div>
            </div>
        </ConfigProvider>
    );
}

export default App;
