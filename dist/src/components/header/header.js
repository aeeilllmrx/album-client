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
exports.Header = void 0;
const react_1 = __importStar(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const react_router_dom_1 = require("react-router-dom");
const react_router_bootstrap_1 = require("react-router-bootstrap");
exports.Header = () => {
    let history = react_router_dom_1.useHistory();
    const [captionText, setCaptionText] = react_1.useState('');
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            history.push('/search/' + captionText);
        }
    };
    return (react_1.default.createElement(react_bootstrap_1.Navbar, { bg: "dark", variant: "dark" },
        react_1.default.createElement(react_router_bootstrap_1.LinkContainer, { to: "/" },
            react_1.default.createElement(react_bootstrap_1.Navbar.Brand, null, "Journey")),
        react_1.default.createElement(react_router_bootstrap_1.LinkContainer, { to: "/home" },
            react_1.default.createElement(react_bootstrap_1.Nav.Link, null, "Home")),
        react_1.default.createElement(react_bootstrap_1.NavDropdown, { title: "Countries", id: "collapsible-nav-dropdown", className: "mr-auto" },
            react_1.default.createElement(react_router_bootstrap_1.LinkContainer, { to: "/travel/Greece" },
                react_1.default.createElement(react_bootstrap_1.NavDropdown.Item, null, "Greece")),
            react_1.default.createElement(react_router_bootstrap_1.LinkContainer, { to: "/travel/India" },
                react_1.default.createElement(react_bootstrap_1.NavDropdown.Item, null, "India")),
            react_1.default.createElement(react_router_bootstrap_1.LinkContainer, { to: "/travel/Argentina" },
                react_1.default.createElement(react_bootstrap_1.NavDropdown.Item, null, "Argentina")),
            react_1.default.createElement(react_router_bootstrap_1.LinkContainer, { to: "/travel/random" },
                react_1.default.createElement(react_bootstrap_1.NavDropdown.Item, null, "Random!"))),
        react_1.default.createElement(react_bootstrap_1.Form, { inline: true },
            react_1.default.createElement(react_bootstrap_1.FormControl, { type: "text", placeholder: "Caption Search", className: "mr-sm-2", onChange: (e) => setCaptionText(e.target.value), onKeyPress: (e) => handleKeyPress(e) }))));
};
