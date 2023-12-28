import { assign, createMachine, fromPromise } from "xstate";

type EventGetCoords = {
  type: "getCoords";
  location: string;
};
type EventGetWeather = {
  type: "getWeather";
  location: string;
  lat: number;
  lng: number;
};

type WeatherMachineEvents = EventGetCoords | EventGetWeather;

interface GeoApiResponse {
  results: Array<{
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    admin1: string;
    country: string;
  }>;
}

export interface ForecastApiResponse {
  current: {
    apparent_temperature: number;
    precipitation: number;
    temperature_2m: number;
    weather_code: number,
  };
  daily: {
    precipitation_sum: Array<number>;
    temperature_2m_max: Array<number>;
    temperature_2m_min: Array<number>;
    time: Array<number>;
    weather_code: Array<number>;
  };
}

const fetchCoords = (location: string) => {
  return fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      location
    )}&count=10&language=en&format=json`
  ).then((res) => res.json() as Promise<GeoApiResponse>);
};

const fetchWeather = (latitude: number, longitude: number) => {
  const params = {
    latitude,
    longitude,
    current: ["temperature_2m", "apparent_temperature", "precipitation", "weather_code"].join(
      ","
    ),
    daily: [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "precipitation_sum",
    ].join(","),
    timezone: encodeURIComponent("Europe/London"),
    format: "json",
    timeformat: "unixtime",
  };
  const stringParams = Object.keys(params)
    .reduce<string[]>((acc, key) => {
      acc.push(`${key}=${params[key as keyof typeof params]}`);
      return acc;
    }, [])
    .join("&");

  return fetch(`https://api.open-meteo.com/v1/forecast?${stringParams}`).then(
    (res) => res.json() as Promise<ForecastApiResponse>
  );
};

const weatherMachine = createMachine({
  id: "weather",
  initial: "idle",
  types: {} as {
    context: {
      location: string;
      locationResults: GeoApiResponse["results"];
      coords?: { lng: number; lat: number };
      weather?: ForecastApiResponse;
    };
    events: WeatherMachineEvents;
  },
  context: {
    location: "",
    locationResults: [],
  },
  states: {
    idle: {
      on: {
        getCoords: {
          target: "fetchCoords",
          // Upon selection on autocomplete the input value is updated with "formatted" name (First upercase)
          // this guard forbid to trigger an extra unwanted API call
          guard: ({ context, event }) => {
            return (
              context.location.toLocaleLowerCase() !==
              event.location.toLocaleLowerCase()
            );
          },
          actions: assign({
            location: ({ event }) => event.location,
            coords: undefined,
            weather: undefined,
          }),
        },
        getWeather: {
          target: "fetchWeather",
          actions: assign({
            coords: ({ event }) => ({ lng: event.lng, lat: event.lat }),
            location: ({ event }) => event.location,
          }),
        },
      },
    },
    fetchCoords: {
      invoke: {
        id: "fetchGeoCoords",
        src: fromPromise(({ input }) => fetchCoords(input.location)),
        input: ({ context }) => ({
          location: context.location,
        }),
        onDone: {
          target: "idle",
          actions: assign({
            locationResults: ({ event }) => event.output.results || [],
          }),
        },
        onError: {
          target: "idle",
        },
      },
    },

    fetchWeather: {
      invoke: {
        id: "fetchWeatherAtLocation",
        src: fromPromise(({ input }) =>
          fetchWeather(input.coords.lat, input.coords.lng)
        ),
        input: ({ context: { coords } }) => ({ coords }),
        onDone: {
          target: "idle",
          actions: assign({
            weather: ({ context, event }) => ({
              current: event.output.current,
              daily: event.output.daily,
            }),
          }),
        },
        onError: {
          target: "idle",
        },
      },
    },
  },
});

export default weatherMachine;
