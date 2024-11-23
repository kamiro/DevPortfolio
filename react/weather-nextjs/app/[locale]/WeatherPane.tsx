import { motion } from "framer-motion";
import { useAtom } from "jotai";
import ExportedImage from "next-image-export-optimizer";
import { useTranslations } from "next-intl";
import { isMetricAtom } from "../lib/atoms";
import { WeatherDetails } from "../lib/weather";

interface Props {
  weather?: WeatherDetails;
}

const WeatherPane = ({ weather }: Props) => {
  const t = useTranslations("WeatherPane");
  const [isMetric, setIsMetric] = useAtom(isMetricAtom);

  if (!weather) return null;

  const temperatureStr = isMetric
    ? `${weather.air_temperature.toFixed(0)}${t("celcius")}`
    : `${((weather.air_temperature * 9) / 5 + 32).toFixed(0)}${t("fahrenheit")}`;

  const windSpeedStr = isMetric
    ? `${weather.wind_speed.toFixed(0)} ${t("metersPerSecond")}`
    : `${(weather.wind_speed * 2.236936).toFixed(0)} ${t("milesPerHour")}`;

  return (
    <motion.div whileInView={{ opacity: 1 }} layout className="flex flex-col items-end w-full self-end">
      <div>
        <ExportedImage
          className="w-32 h-32 md:w-36 md:h-36 xl:h-48 xl:w-48"
          src={`/icons/weather/${weather.symbol_code}.svg`}
          alt={weather.simple_symbol_code}
          width={144}
          height={144}
          priority
          unoptimized
          style={{ filter: "drop-shadow(3px 3px 2px rgba(0, 0, 0, 0.5))" }}
        />
      </div>
      <h1
        className="text-[4rem] sm:text-[5rem] md:text-[6rem] font-extrabold leading-none"
        onPointerDown={() => setIsMetric((i) => !i)}
      >
        {temperatureStr}
      </h1>
      <section className="flex flex-col items-end text-lg md:text-2xl">
        <div>
          {t("humidity")} {Math.round(weather.relative_humidity)}%
        </div>
        <div className="">
          {t("wind")}
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            xmlns="http://www.w3.org/2000/svg"
            className="inline-block ml-2"
            style={{ transform: `rotate(${weather.wind_from_direction}deg)` }}
          >
            <path d="m8 6 4-4m0 0 4 4m-4-4v20" />
          </svg>
          {windSpeedStr}
        </div>
      </section>
    </motion.div>
  );
};

export default WeatherPane;
