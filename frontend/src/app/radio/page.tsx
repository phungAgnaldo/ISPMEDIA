"use client";
import React, { useState } from "react";
import { RadioBrowserApi, Station } from "radio-browser-api";
import Image from "next/image";

export default async function Radio() {
  const api = new RadioBrowserApi("My Radio App");

  const setupApi = await api.searchStations({
    language: "english",
    limit: 10,
  });

  return (
    <div className="radio">
      <div className="grid grid-cols-4 gap-6 content-around">
        {setupApi.map((station, index) => {
          return (
            <div className="station" key={index}>
              <div className="stationName">
                <figure className="w-900 h-900 overflow-hidden">
                  <Image
                    src={station.favicon ? station.favicon : "/radio.webp"}
                    alt="Radio Stations"
                    width={900}
                    height={32}
                    className="bg-cover object-contain"
                  />
                  <div className="name">{station.name}</div>
                </figure>
              </div>

              <video
                className={"h-12 my-6"}
                src={station.urlResolved}
                controls
                width={900}
              ></video>
            </div>
          );
        })}
      </div>
    </div>
  );
}
