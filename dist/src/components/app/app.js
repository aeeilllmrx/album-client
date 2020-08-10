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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const react_tooltip_1 = __importDefault(require("react-tooltip"));
const finder_1 = require("../finder/finder");
const header_1 = require("../header/header");
const map_1 = require("../map/map");
const viewer_1 = require("../viewer/viewer");
function App() {
    const [content, setContent] = react_1.useState('');
    const countries = ['Greece', 'India', 'Argentina'];
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
            react_1.default.createElement(react_router_dom_1.Switch, null,
                react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/", render: () => (react_1.default.createElement("div", null,
                        react_1.default.createElement(header_1.Header, null),
                        react_1.default.createElement(map_1.Map, { setTooltipCountry: setContent }),
                        react_1.default.createElement(react_tooltip_1.default, null, content))) }),
                react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/home", render: () => (react_1.default.createElement("div", null,
                        react_1.default.createElement(header_1.Header, null),
                        react_1.default.createElement(map_1.Map, { setTooltipCountry: setContent }),
                        react_1.default.createElement(react_tooltip_1.default, null, content))) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: "/travel/random", render: () => (react_1.default.createElement(react_router_dom_1.Redirect, { to: '/travel/' +
                            countries[Math.floor(Math.random() * countries.length)] })) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: "/travel/:country", render: (props) => (react_1.default.createElement("div", null,
                        react_1.default.createElement(header_1.Header, null),
                        react_1.default.createElement(viewer_1.Viewer, { country: props.match.params.country }))) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: "/search/:text", render: (props) => (react_1.default.createElement("div", null,
                        react_1.default.createElement(header_1.Header, null),
                        react_1.default.createElement(finder_1.Finder, { text: props.match.params.text }))) })))));
}
exports.App = App;
