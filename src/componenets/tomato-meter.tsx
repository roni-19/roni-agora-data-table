import { Progress } from "antd";

export default function TomatoMeter({ value }: { value: number }) {
    const getColor = (value: number) => {
        if (value < 60) {
            return "#7c3838"
        }
        if (value >= 60 && value < 75) {
            return "rgba(133,41,41,0.6)"
        }
        if (value >= 75) {
            return "rgba(255,103,103,0.6)"
        }
        return "#477dc2";
    }
    const getImage = (value: number) => {
        if (value < 60) {
            return <img src={"/rotten.png"} alt={"rotten"} width={25}/>
        }
        if (value >= 60 && value < 75) {
            return <img src={"/rotten-tomato.png"} alt={"rotten"} width={25}/>
        }
        if (value >= 75) {
            return <img src={"/fresh-tomato.png"} alt={"rotten"} width={25}/>
        }
        return <img src={"/rotten-tomato.png"} alt={"rotten"} width={25}/>
    }

    return (
        <div className="flex items-center gap-3">
            {getImage(value)}
            <Progress percent={value} size="small" className="m-0" strokeColor={getColor(value)}/>
        </div>
    )
}