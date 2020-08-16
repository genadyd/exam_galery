import {
    ADD_IMAGES_TO_GALERY,
    CLEAR_FORM, DISPLAY_IMAGE_TO_MAIN_SCREEN,
    GALERY_DELETE,
    GALERY_EDITOR_ENABLE,
    GALERY_SAVE, MODAL_CLOSE,
    MODAL_OPEN,
    ON_CHANGE_DATE,
    ON_CHANGE_TEXT, SET_GALERY_MAIN_IMAGE
} from "./types";

export const textOnChange = ( inputDataObj )=>(dispatch)=>{
//     console.log(inputDataObj)
 dispatch({
     type:ON_CHANGE_TEXT,
     payload:inputDataObj

 })
}
export const dateOnChange = ( dValue )=>(dispatch)=>{
    dispatch({
        type:ON_CHANGE_DATE,
        payload:dValue

    })
}
export const galerySave = ()=>(dispatch)=>{
    dispatch({
        type:GALERY_SAVE,
        payload:''
    })
    dispatch({
        type:CLEAR_FORM,
        payload:''
    })
}
export const galeryEditEnable = (key)=>(dispatch)=>{
    dispatch({
        type:GALERY_EDITOR_ENABLE,
        payload:key
    })
}
export const galeryDelete = (key)=>(dispatch)=>{

    dispatch({
        type:GALERY_DELETE,
        payload:key
    })
    dispatch({
        type:CLEAR_FORM,
        payload:''
    })
}
export const modalOpen = (galeryId)=>(dispatch)=>{
    const requestData = {
        method:'POST',
    };
    fetch('http://localhost:80/exam_galery/api/get-all',requestData)
        .then(res=>res.json())
        .then(
            data=>{
                dispatch({
                    type:MODAL_OPEN,
                    payload:{data, galeryId}
                })
            }
    )
}
export const modalClose = ()=>(dispatch)=>{
    dispatch({
        type:MODAL_CLOSE,
        payload:''
    })
}
export const saveImagesToGalery = (galeryId, imagesObject)=>(dispatch)=>{
    dispatch({
        type:ADD_IMAGES_TO_GALERY,
        payload:{galeryId, imagesObject}
    })
}
export const setScreenImage = (img, key, galery_id)=>(dispatch)=>{
    dispatch({
        type:DISPLAY_IMAGE_TO_MAIN_SCREEN,
        payload:{index:key, img:img, galery_id}
    })

}
export const setGaleryMainImage = (templateData)=>(dispatch)=>{
    dispatch({
        type:SET_GALERY_MAIN_IMAGE,
        payload:templateData
    })

}

