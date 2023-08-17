import React from "react";
export interface DataType {
    key: React.Key;
    movie_title: string;
    mcu_phase: number;
    release_date: string;
    tomato_meter: number;
    imdb: number;
    movie_duration: number
    production_budget: number
    opening_weekend: number;
    domestic_box_office: number;
    worldwide_box_office: number;
    link?: string
}