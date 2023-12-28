import { Box } from "@gemini/core";
import { Autocomplete, Link } from "@gemini/ui";
import { useCallback, useMemo, useState } from "react";
import { debounce } from "lodash";
import weatherMachine from "@/machines/WeatherMachine";
import { useMachine } from "@xstate/react";
import WeatherCard from "@/components/WeatherMachine/WeatherCard";

const Weather = () => {
  const [state, send] = useMachine(weatherMachine);

  const { location, locationResults, weather } = state.context;

  const onInputChange = useMemo(
    () =>
      debounce((value: string) => {
        send({ type: "getCoords", location: value });
      }, 250),
    [send]
  );
  console.log(state.value);
  const onSubmit = (_: string | null, key: string | null) => {
    const location = locationResults.find((item) => item.id.toString() === key);
    if (!location) return;

    send({
      type: "getWeather",
      location: location.name,
      lat: location.latitude,
      lng: location.longitude,
    });
  };

  return (
    <Box padding="spacing.32">
      <Link href="/">Back</Link>
      <Autocomplete
        items={locationResults.map((item) => ({
          id: item.id.toString(),
          label: item.name,
          suffix: `${item.admin1} (${item.country})`,
        }))}
        label="Location"
        hasNecessityIndicator={false}
        onChange={onInputChange}
        onSubmit={onSubmit}
      />
      {weather && (
        <WeatherCard location={location} forecast={weather} />
      )}
    </Box>
  );
};

export default Weather;
