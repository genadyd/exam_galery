import {GALERIES_LIST_SYNC} from "./types";

export const syncGaleryListState =()=>(dispatch)=>{
    if(sessionStorage.galeriesList ) {
        const storageList = sessionStorage.getItem('galeriesList')
        dispatch({
            type: GALERIES_LIST_SYNC,
            payload: JSON.parse(storageList)
        })
    }
}
