import thunk from "redux-thunk";
import {applyMiddleware, combineReducers, createStore} from "redux";
import GaleryesSettingsReduser from "./redusers/GaleryesSettingsReduser";
import GaleriesState from "./states/galeries_state";


const middleware = [thunk]
const mainReduser = combineReducers({
   galerySetting: GaleryesSettingsReduser
})
const store = createStore(mainReduser, GaleriesState ,applyMiddleware(...middleware) )
export default store
