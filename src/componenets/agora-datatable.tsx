import React, { useState } from "react";
import { Button, Table, TableProps } from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import type { ResizeCallbackData } from "react-resizable";
import "../datatable.css";
import ResizableTitle from "./resizable-title";
import { dayjs } from "../initializers/dayjs";
import { data } from "../data";
import { uniq } from "lodash";
import { DataType } from "../types";
import { CurrencyFilter, DateFilter, NumericFilter } from "./filters";
import { currencyFormatter } from "../utils/formatters";
import { FilterValue } from "antd/es/table/interface";
import { ImdbRank, TomatoMeter } from "./cells";

export default function AgoraDatatable() {
    const [filters, setFilters] = useState<Record<string, FilterValue | null>>({});
    const [numOfRows, setNumOfRows] = useState<number>(data.length)

    const initialColumns: ColumnsType<DataType> = [
        {
            title: "Movie Title",
            dataIndex: "movie_title",
            filters: data.map(({ movie_title }) => ({ text: movie_title, value: movie_title })),
            onFilter: (value: string | boolean | number, record) => record.movie_title === value,
            filterSearch: true,
            filteredValue: filters.movie_title || null,
            sorter: (a, b) => a.movie_title.localeCompare(b.movie_title),
            width: 200,
            render: (value, record) => <a href={record.link} className="font-bold">{value}</a>
        },
        {
            title: "MCU Phase",
            dataIndex: "mcu_phase",
            sorter: (a, b) => a.mcu_phase - b.mcu_phase,
            width: 50,
            filters: uniq(data.map(({ mcu_phase }) => mcu_phase)).map(phase => ({ text: phase, value: phase })),
            onFilter: (value: string | boolean | number, record) => record.mcu_phase === value,
            filteredValue: filters.mcu_phase || null,
        },
        {
            title: "Release Date",
            dataIndex: "release_date",
            width: 100,
            sorter: (a, b) => dayjs(a.release_date).isAfter(dayjs(b.release_date)) ? 1 : -1,
            ...DateFilter("release_date"),
            filteredValue: filters.release_date || null,
        },
        {
            title: "Tomato Meter",
            dataIndex: "tomato_meter",
            width: 140,
            ...NumericFilter("tomato_meter"),
            filteredValue: filters.tomato_meter || null,
            sorter: (a, b) => a.tomato_meter - b.tomato_meter,
            render: (value) => <TomatoMeter value={value}/>
        },
        {
            title: "IMDB Rank",
            dataIndex: "imdb",
            width: 140,
            ...NumericFilter("imdb", 0.1),
            filteredValue: filters.imdb || null,
            sorter: (a, b) => a.imdb - b.imdb,
            render: (value) => <ImdbRank rank={value}/>
        },
        {
            title: "Movie Duration (m)",
            dataIndex: "movie_duration",
            ...NumericFilter("movie_duration"),
            filteredValue: filters.movie_duration || null,
            sorter: (a, b) => a.movie_duration - b.movie_duration,
            width: 100,
            render: value => {
                const hours = Math.floor(value / 60);
                const minutes = value % 6
                return dayjs.duration({ minutes, hours }).format("HH:mm")
            }
        },
        {
            title: "Production Budget",
            dataIndex: "production_budget",
            render: value => currencyFormatter.format(value),
            ...CurrencyFilter("production_budget"),
            filteredValue: filters.production_budget || null,
            sorter: (a, b) => a.production_budget - b.production_budget,
            width: 100,
        },
        {
            title: "Opening Weekend",
            dataIndex: "opening_weekend",
            render: value => currencyFormatter.format(value),
            ...CurrencyFilter("opening_weekend"),
            filteredValue: filters.opening_weekend || null,
            sorter: (a, b) => a.opening_weekend - b.opening_weekend,
            width: 100
        },
        {
            title: "Domestic Box Office",
            dataIndex: "domestic_box_office",
            render: value => currencyFormatter.format(value),
            ...CurrencyFilter("domestic_box_office"),
            filteredValue: filters.domestic_box_office || null,
            sorter: (a, b) => a.domestic_box_office - b.domestic_box_office,
            width: 100

        },
        {
            title: "Worldwide Box Office",
            dataIndex: "worldwide_box_office",
            ...CurrencyFilter("worldwide_box_office"),
            filteredValue: filters.worldwide_box_office || null,
            sorter: (a, b) => a.worldwide_box_office - b.worldwide_box_office,
            render: value => currencyFormatter.format(value),

        },
    ]

    const getColumns = () => {
        const sizes = localStorage.getItem("columns");
        if (sizes) {
            const parsed = JSON.parse(sizes);
            return initialColumns.reduce<ColumnsType<DataType>>((acc, column) => {
                const dataIndex = (column as ColumnType<DataType>).dataIndex;
                if (dataIndex) {
                    return [...acc, { ...column, width: parsed[dataIndex as string] ?? 100 }]
                }
                return [...acc]
            }, [])
        } else {
            return initialColumns;
        }
    }

    const [columns, setColumns] = useState<ColumnsType<DataType>>(getColumns);

    const handleResize: Function = (index: number) => (e: React.SyntheticEvent<Element>, { size }: ResizeCallbackData) => {
        const newColumns = [...columns];
        newColumns[index] = {
            ...newColumns[index],
            width: size.width,
        };
        setColumns(newColumns);
        const sizes = newColumns.reduce<Record<string, number | string>>((acc, column) => {
            const dataIndex = (column as ColumnType<DataType>).dataIndex;
            if (dataIndex) {
                return { ...acc, [dataIndex as string]: column.width ?? 100 }
            }
            return { ...acc }
        }, {})
        localStorage.setItem("columns", JSON.stringify(sizes))
    };

    const mergeColumns: ColumnsType<DataType> = columns.map((col, index) => ({
        ...col,
        filteredValue: filters[(col as ColumnType<DataType>).dataIndex as string] || null,
        onHeaderCell: (column: ColumnsType<DataType>[number]) => ({
            width: column.width,
            onResize: handleResize(index)
        }),
    }));

    const clearFilters = () => {
        setFilters({});
        setNumOfRows(data.length)
    };
    const handleChange: TableProps<DataType>["onChange"] = (pagination, filters, sorter, extra) => {
        setFilters(filters);
        setNumOfRows(extra.currentDataSource.length)
    };

    return (
        <div className="flex flex-col gap-2 py-4">
            <div className="flex items-center gap-4">
                <div>Total of {numOfRows} movies</div>
                <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
            <Table
                bordered
                components={{
                    header: {
                        cell: ResizableTitle,
                    },
                }}
                onChange={handleChange}
                columns={mergeColumns}
                dataSource={data}
            />
        </div>
    )
}
