import {handleModeChange} from "./main";
import "./interfaces/global"
import "normalize.css";
import "../styles/common.css";
import {setBtnsAvailability} from "./pagination";

setBtnsAvailability()
handleModeChange();
