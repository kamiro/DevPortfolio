'use client'

import { useAtom, useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { currentLocationAtom, locationPermissionAtom } from "./atoms";
import { weatherFetcher } from "./weather";


export const useWeather = () => {
  const currentLocation = useAtomValue(currentLocationAtom);

  const { data, error, isLoading } = useSWR(currentLocation ?? null, weatherFetcher);

  return { data, error, isLoading };
}

const CURRENT_POSITION_RETRIES = 3;
const CURRENT_POSITION_DELAY = 5 * 1000; // 5 seconds

const sleep = (milliseconds: number) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

const getCurrentPosition = async (): Promise<GeolocationPosition | null | undefined> => {
  // Return null if geolocation is not supported
  if (!('geolocation' in navigator)) {
    return null;
  }

  // Attempt to get the current position multiple times (mainly for iOS devices that
  // might not have a cached location). Also don't judge the start at 1, it's for humans/logs.
  for (let i = 1; i <= CURRENT_POSITION_RETRIES; i++) {
    try {
      const fetchLocation: GeolocationPosition = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          maximumAge: 60 * 60 * 1000, // One hour
          timeout: CURRENT_POSITION_DELAY / 2,
          enableHighAccuracy: false
        });
      });

      console.log(`Attempt ${i}: Fetched location`, fetchLocation);
      return fetchLocation;
    } catch (error: unknown) {
      const e = error as GeolocationPositionError;
      if (e.code === 1) {
        return null; // Permission denied
      }
    }

    // If we are going to do a retry, let's wait a bit before trying again.
    if (i < CURRENT_POSITION_RETRIES) {
      await sleep(CURRENT_POSITION_DELAY);
    }
  }

  // We've run out of attempts, let's return null
  return null;
}

export const useLocationPermission = () => {
  const [locationPermission, setLocationPermission] = useAtom(locationPermissionAtom);
  const updateLocationPermission = async () => {
    if ('permissions' in navigator) {
      const permission = await navigator.permissions.query({ name: "geolocation" });
      setLocationPermission(permission.state);
    } else if ('geolocation' in navigator) {
      setLocationPermission("prompt");
    } else {
      setLocationPermission("denied");
    }
  }

  return { locationPermission, updateLocationPermission }
}

export const useLocation = () => {
  const { locationPermission, updateLocationPermission } = useLocationPermission();
  const [currentLocation, setCurrentLocation] = useAtom(currentLocationAtom);

  // Run updateLocationPermission on mount
  useEffect(() => {
    updateLocationPermission();
  }, [updateLocationPermission]);

  // When the component mounts, let's proactivelly get the location
  // or set it to null if we don't have permission so we can have a
  // up to date interface off the bat.
  useEffect(() => {
    if (locationPermission === "granted") {
      getCurrentPosition()
        .then(setCurrentLocation);
    } else if (locationPermission === "denied") {
      setCurrentLocation(null);
    }
  }, [locationPermission, setCurrentLocation]);

  // Provide a method that will actively request the location and can
  // be triggered by an explicit action from the user. This avoids
  // permission bombing the user and annoying them.
  const requestLocation = () => {
    getCurrentPosition()
      .then(setCurrentLocation)
      .then(updateLocationPermission)
      .catch((error) => console.error(error));
  }

  return { currentLocation, locationPermission, requestLocation }
}

const getActiveSizes = (innerWidth = window.innerWidth) => {
  return {
    // Values from TailwindCSS (Nov 22 2024)
    // https://tailwindcss.com/docs/responsive-design#targeting-mobile-screens
    isSm: innerWidth >= 640,
    isMd: innerWidth >= 768,
    isLg: innerWidth >= 1024,
    isXl: innerWidth >= 1280,
    is2xl: innerWidth >= 1536
  }
}

type ActiveSizes = ReturnType<typeof getActiveSizes>;
export const useReactiveScreen = () => {
  // We can't check the active sizes on the server, so we'll default to undefined
  // until the hook is run on the client after rehydration.
  const [activeSizes, setActiveSizes] = useState<ActiveSizes>(getActiveSizes(0));

  useEffect(() => {
    const handleResize = () => setActiveSizes(getActiveSizes())
    handleResize();

    // Watch if the window has changed and update the active sizes
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Active sizes will not be undefined on first client render.
  return activeSizes;
}