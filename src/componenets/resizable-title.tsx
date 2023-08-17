import React from "react";
import { Resizable, ResizeCallbackData } from "react-resizable";

export default function ResizableTitle(
    {
        onResize,
        width,
        ...restProps
    }: { onResize: (e: React.SyntheticEvent, data: ResizeCallbackData) => void, width: number }
) {

    if (!width) {
        return <th {...restProps} />;
    }

    return (
        <Resizable
            width={width}
            height={0}
            handle={
                <span
                    className="react-resizable-handle"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                />
            }
            onResize={onResize}
            draggableOpts={{ enableUserSelectHack: false }}
        >
            <th {...restProps} />
        </Resizable>
    );
};