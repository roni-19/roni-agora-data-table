import { data } from "../data";
import { Button, DatePicker, Slider } from "antd";
import React from "react";
import { DataType } from "../types";
import { FilterDropdownProps } from "antd/lib/table/interface";
import { currencyFormatter } from "../utils/formatters";
import { dayjs } from "../initializers/dayjs";

export const NumericFilter = (dataIndex: keyof DataType, step=1) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }: FilterDropdownProps) => {
        const maxValue = Math.max(...data.map(movie => movie[dataIndex] as number))
        return (
            <div className="p-3">
                <Slider
                    range
                    max={maxValue}
                    value={selectedKeys[0] ? JSON.parse(selectedKeys[0] as string) : [0, maxValue]}
                    onChange={value => setSelectedKeys([JSON.stringify(value)] ?? [])}
                    marks={{ 0: '0', [maxValue]: maxValue }}
                    step={step}
                />
                <Button
                    className="bg-blue-600"
                    type="primary"
                    block
                    size="small"
                    onClick={() => {
                        confirm()
                    }}
                >
                    Confirm
                </Button>
            </div>
        )
    },
    onFilter: (value: string | boolean | number, { [dataIndex]: recordValue }: DataType) => {
        const range = JSON.parse(value as string)
        return recordValue ? recordValue >= range[0] && recordValue <= range[1] : false
    }
})


export const CurrencyFilter = (dataIndex: keyof DataType) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }: FilterDropdownProps) => {
        const maxValue = Math.max(...data.map(movie => movie[dataIndex] as number))
        return (
            <div className="py-2 px-8">
                <Slider
                    range
                    max={maxValue}
                    value={selectedKeys[0] ? JSON.parse(selectedKeys[0] as string) : [0, maxValue]}
                    onChange={value => setSelectedKeys([JSON.stringify(value)] ?? [])}
                    marks={{ 0: '0', [maxValue]: currencyFormatter.format(maxValue) }}
                    className="w-[100px]"
                    tooltip={{formatter: value => currencyFormatter.format(value as number)}}
                />
                <Button
                    className="bg-blue-600"
                    type="primary"
                    block
                    size="small"
                    onClick={() => {
                        confirm()
                    }}
                >
                    Confirm
                </Button>
            </div>
        )
    },
    onFilter: (value: string | boolean | number, { [dataIndex]: recordValue }: DataType) => {
        const range = JSON.parse(value as string)
        return recordValue ? recordValue >= range[0] && recordValue <= range[1] : false
    }
})

export const DateFilter = (dataIndex: keyof DataType) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }: FilterDropdownProps) => {
        return (
            <div className="p-3 flex flex-col gap-2">
                <DatePicker.RangePicker
                    value={selectedKeys[0] ? JSON.parse(selectedKeys[0] as string).map((date: string) => dayjs(date)) : null}
                    onChange={value => setSelectedKeys(value ? [JSON.stringify(value)] : [])}
                />
                <Button
                    className="bg-blue-600"
                    type="primary"
                    block
                    size="small"
                    onClick={() => {
                        confirm()
                    }}
                >
                    Confirm
                </Button>
            </div>
        )
    },
    onFilter: (value: string | boolean | number, { [dataIndex]: recordValue }: DataType) => {
        const range = JSON.parse(value as string)
        return dayjs(recordValue).isBetween(dayjs(range[0]), dayjs(range[1]));
    },
})

