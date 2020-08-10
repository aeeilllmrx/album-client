import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps';

const geoUrl =
  'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

const visited = new Set([
  'Thailand',
  'Indonesia',
  'India',
  'Greece',
  'Italy',
  'Spain',
  'United Kingdom',
  'Argentina',
]);

const markers = [
  {
    markerOffset: 15,
    name: 'Thailand',
    coordinates: [100.9925, 15.87],
  },
  { markerOffset: 15, name: 'Indonesia', coordinates: [113.9213, -0.7893] },
  { markerOffset: 15, name: 'India', coordinates: [78.9629, 20.5937] },
  { markerOffset: 15, name: 'Greece', coordinates: [21.8243, 39.0742] },
  { markerOffset: 15, name: 'Italy', coordinates: [12.5674, 41.8719] },
  { markerOffset: 15, name: 'Spain', coordinates: [-3.7492, 40.4637] },
  { markerOffset: 15, name: 'United Kingdom', coordinates: [-3.436, 55.3781] },
  { markerOffset: 15, name: 'Argentina', coordinates: [-63.6167, -38.4161] },
];

export const Map = ({ setTooltipCountry }) => {
  const [country, setCountry] = useState('');

  let history = useHistory();

  const handleClick = () => {
    history.push('/travel/' + country);
  };

  return (
    <>
      <ComposableMap
        data-tip=""
        width={1200}
        height={600}
        style={{ width: '100%', height: 'auto' }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onMouseEnter={() => {
                  const { NAME, _ } = geo.properties;
                  setCountry(NAME);
                  setTooltipCountry(NAME);
                }}
                onMouseLeave={() => {
                  setCountry('');
                  setTooltipCountry('');
                }}
                onClick={() => {
                  const { NAME, _ } = geo.properties;
                  if (visited.has(NAME)) {
                    handleClick();
                  }
                }}
                style={{
                  default: {
                    fill: '#D6D6DA',
                    outline: 'none',
                  },
                  hover: {
                    fill: '#F53',
                    outline: 'none',
                  },
                  pressed: {
                    fill: '#E42',
                    outline: 'none',
                  },
                }}
              />
            ))
          }
        </Geographies>
        {markers.map(({ name, coordinates, markerOffset }) => (
          <Marker key={name} coordinates={coordinates}>
            <g
              fill="none"
              stroke="#FF5533"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(-12, -24)"
            >
              <circle cx="12" cy="10" r="3" />
              <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
            </g>
            <text
              textAnchor="middle"
              y={markerOffset}
              style={{
                fontFamily: 'system-ui',
                fill: '#5D5A6D',
                fontSize: '12',
              }}
            >
              {/* leaving out text for now; replace with `name` to include */}
            </text>
          </Marker>
        ))}
      </ComposableMap>
    </>
  );
};
