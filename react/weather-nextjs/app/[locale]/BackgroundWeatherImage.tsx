import { motion } from "framer-motion";
import ExportedImage from "next-image-export-optimizer";
import { useState } from "react";
import { SimpleSymbolCode, weatherImages } from "../lib/weather";

interface Props {
  weatherCode?: SimpleSymbolCode;
}

const BackgroundWeatherImage = ({ weatherCode }: Props) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  if (!weatherCode) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }} // Starting opacity of the div.
      animate={{ opacity: imageLoaded ? 1 : 0 }} // Animate based on isLoaded state.
      transition={{ duration: 1.2 }} // Animation duration.
      className={`absolute inset-0`}
    >
      <ExportedImage
        alt="Weather Background"
        src={weatherImages[weatherCode]}
        placeholder="blur"
        fill
        onLoad={() => setImageLoaded(true)}
        style={{
          objectFit: "cover",
        }}
        priority
      />
    </motion.div>
  );
};

export default BackgroundWeatherImage;
