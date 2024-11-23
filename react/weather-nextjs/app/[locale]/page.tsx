"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic.js";
import { useCallback } from "react";
import { useWeather } from "../lib/hooks";
import BackgroundWeatherImage from "./BackgroundWeatherImage";
import LanguagePicker from "./LanguagePicker";
import RequestLocation from "./RequestLocationPane";
import WeatherPane from "./WeatherPane";

const Home = () => {
  const { data: weatherData } = useWeather();

  const simpleSymbolCode = weatherData?.simple_symbol_code ?? "unknown";
  const MemoedBackgroundWeatherImage = useCallback(
    () => <BackgroundWeatherImage weatherCode={simpleSymbolCode} />,
    [simpleSymbolCode]
  );

  // Only talk about animations client side
  if (typeof window === "undefined") return null;
  const isSm = window.innerWidth >= 640;
  const initial = isSm ? { x: "-100%", opacity: 0 } : { y: "100%", opacity: 0 };
  const animate = isSm ? { x: 0, opacity: 1 } : { y: 0, opacity: 1 };

  const justifyContent = weatherData ? "justify-end" : "justify-center";

  return (
    <div className="relative w-full h-full">
      <MemoedBackgroundWeatherImage />
      <div className="absolute inset-0 flex flex-row items-end sm:items-start sm:flex-col">
        <motion.div
          initial={initial}
          animate={animate}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          layout
          className={`w-full sm:w-1/2 sm:h-full lg:w-1/3 bg-slate-950 bg-opacity-40 flex flex-col p-4 py-8 sm:p-8 lg:p-12 ${justifyContent}`}
        >
          <RequestLocation />
          <WeatherPane weather={weatherData} />
        </motion.div>
      </div>
      <LanguagePicker />
    </div>
  );
};

// Stop server side rendering of this item
export default dynamic(() => Promise.resolve(Home), { ssr: false });
