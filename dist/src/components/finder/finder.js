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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Finder = void 0;
const react_1 = __importStar(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
require("./finder.css");
function importAll(r) {
    return r.keys().map(r);
}
const prod = false;
const server = prod ? 'unknown' : 'http://localhost:5000/';
const images = importAll(require.context('../../images/greece/athens/', false, /^\.\/.*$/));
const fetch = require('node-fetch'); // TODO: remove require
exports.Finder = (props) => {
    const [text] = react_1.useState(props.text);
    const [state, setState] = react_1.useState({
        data: { id: 0, caption: '' },
    });
    react_1.useEffect(() => {
        const getData = () => __awaiter(void 0, void 0, void 0, function* () {
            const url = server + 'search/' + text;
            try {
                const response = yield fetch(url);
                const data = yield response.json();
                if (data.error) {
                    return;
                }
                setState((state) => {
                    return Object.assign(Object.assign({}, state), { data: data });
                });
            }
            catch (e) {
                console.error(`An error has occured while calling the API. ${e}`);
                throw e;
            }
        });
        getData();
    }, [text]);
    return (react_1.default.createElement(react_bootstrap_1.Container, { fluid: true },
        react_1.default.createElement(react_bootstrap_1.Row, null,
            react_1.default.createElement("div", { className: "caption" }, state.data.caption)),
        react_1.default.createElement(react_bootstrap_1.Row, null,
            react_1.default.createElement("img", { className: "photo", src: images[state.data.id - 1], alt: '' }))));
};
