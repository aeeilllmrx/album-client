"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Map = void 0;
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const react_simple_maps_1 = require("react-simple-maps");
const geoUrl = 'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';
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
exports.Map = ({ setTooltipCountry }) => {
    const [country, setCountry] = react_1.useState('');
    let history = react_router_dom_1.useHistory();
    const handleClick = () => {
        history.push('/travel/' + country);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(react_simple_maps_1.ComposableMap, { "data-tip": "", width: 1200, height: 600, style: { width: '100%', height: 'auto' } },
            react_1.default.createElement(react_simple_maps_1.Geographies, { geography: geoUrl }, ({ geographies }) => geographies.map((geo) => (react_1.default.createElement(react_simple_maps_1.Geography, { key: geo.rsmKey, geography: geo, onMouseEnter: () => {
                    const { NAME, _ } = geo.properties;
                    setCountry(NAME);
                    setTooltipCountry(NAME);
                }, onMouseLeave: () => {
                    setCountry('');
                    setTooltipCountry('');
                }, onClick: () => {
                    const { NAME, _ } = geo.properties;
                    if (visited.has(NAME)) {
                        handleClick();
                    }
                }, style: {
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
                } })))),
            markers.map(({ name, coordinates, markerOffset }) => (react_1.default.createElement(react_simple_maps_1.Marker, { key: name, coordinates: [coordinates[0], coordinates[1]] },
                react_1.default.createElement("g", { fill: "none", stroke: "#FF5533", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", transform: "translate(-12, -24)" },
                    react_1.default.createElement("circle", { cx: "12", cy: "10", r: "3" }),
                    react_1.default.createElement("path", { d: "M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" })),
                react_1.default.createElement("text", { textAnchor: "middle", y: markerOffset, style: {
                        fontFamily: 'system-ui',
                        fill: '#5D5A6D',
                        fontSize: '12',
                    } })))))));
};
