import { ForecastApiResponse } from "@/machines/WeatherMachine";
import { Box } from "@gemini/core";
import { Divider } from "@gemini/ui";

interface WeatherCardProps {
  location: string;
  forecast: ForecastApiResponse;
}

const WMOToEmoji = (code: number) => {
  const codes2Emo = {
    // 0	Clear sky
    0: "🌞",
    // 1, 2, 3	Mainly clear, partly cloudy, and overcast
    1: "🌤️",
    2: "⛅️",
    3: "☁️",
    // 45, 48	Fog and depositing rime fog
    45: "🌫️",
    48: "🌫️❄️",
    // 51, 53, 55	Drizzle: Light, moderate, and dense intensity
    51: "💦",
    53: "💦💦",
    55: "💦💦💦",
    // 56, 57	Freezing Drizzle: Light and dense intensity
    56: "💦❄️",
    57: "💦❄️💦",
    // 61, 63, 65	Rain: Slight, moderate and heavy intensity
    61: "🌧️",
    63: "🌧️🌧️",
    65: "🌧️🌧️🌧️",
    // 66, 67	Freezing Rain: Light and heavy intensity
    66: "🌧️❄️",
    67: "🌧️❄️🌧️",
    // 71, 73, 75	Snow fall: Slight, moderate, and heavy intensity
    71: "❄️",
    73: "❄️❄️",
    75: "❄️❄️❄️",
    // 77	Snow grains
    77: "☃️",
    // 80, 81, 82	Rain showers: Slight, moderate, and violent
    80: "🚿🌧️",
    81: "🚿🌧️🌧️",
    82: "🚿🌧️🌧️🌧️",
    // 85, 86	Snow showers slight and heavy
    85: "🚿❄️",
    86: "🚿❄️❄️❄️",
    // 95 *	Thunderstorm: Slight or moderate
    95: "⛈️",
    // 96, 99 *	Thunderstorm with slight and heavy hail
    96: "⛈️🧊",
    99: "⛈️🧊🧊",
  } as const;

  if (code in codes2Emo) return codes2Emo[code as keyof typeof codes2Emo];

  return "?";
};

const WeatherCard = ({ location, forecast }: WeatherCardProps) => {
  return (
    <Box
      padding="spacing.4"
      marginTop="spacing.12"
      backgroundColor="color.background.light"
    >
      <Box typography="typography.headline.22.bold" textAlign="center">
        {location}
      </Box>
      <Divider />

      <Box typography="typography.body.16.boldUnderlined" marginTop="spacing.8">
        Currently
      </Box>

      <Box>
        Weather: {WMOToEmoji(forecast.current.weather_code)}
        <br />
        Precipitation: {forecast.current.precipitation}mm
        <br />
        Temperature: {forecast.current.temperature_2m}°C
        <br />
        Apparent temperature: {forecast.current.apparent_temperature}°C
      </Box>

      <Box typography="typography.body.16.boldUnderlined" marginTop="spacing.8">
        Forecast
      </Box>

      <table border={1}>
        <thead>
          <tr>
            <th></th>
            {forecast.daily.time.map((time, index) => {
              return <th key={index}>D +{index + 1}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Weather</td>
            {forecast.daily.weather_code.map((weather_code, index) => {
              return <td key={index}>{WMOToEmoji(weather_code)}</td>;
            })}
          </tr>
          <tr>
            <td>Precipitation (mm)</td>
            {forecast.daily.precipitation_sum.map(
              (precipitation_sum, index) => {
                return <td key={index}>{precipitation_sum}</td>;
              }
            )}
          </tr>
          <tr>
            <td>Temperature min</td>
            {forecast.daily.temperature_2m_min.map((min, index) => {
              return <td key={index}>{min}°C</td>;
            })}
          </tr>
          <tr>
            <td>Temperature max</td>
            {forecast.daily.temperature_2m_max.map((max, index) => {
              return <td key={index}>{max}°C</td>;
            })}
          </tr>
        </tbody>
      </table>
      {/* {forecast.daily.time.map((time, index) => {
        const weather_code = forecast.daily.weather_code[index];
        const precipitation = forecast.daily.precipitation_sum[index];
        const temperature_2m_max = forecast.daily.temperature_2m_max[index];
        const temperature_2m_min = forecast.daily.temperature_2m_min[index];
        return (
          <Box key={time}>
            <Box typography="typography.body.11.boldUnderlined">
              {new Date(time * 1000).toLocaleDateString()}
            </Box>
            <Box>
              Weather: {WMOToEmoji(weather_code)}
              <br />
              Precipitation: {precipitation}
              <br />
              Temperature (min/max): {temperature_2m_min}°C /{" "}
              {temperature_2m_max}°C
              <br />
            </Box>
          </Box>
        );
      })} */}
    </Box>
  );
};

export default WeatherCard;
