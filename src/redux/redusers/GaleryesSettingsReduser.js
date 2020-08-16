import GaleriesState from "../states/galeries_state"
import {
    ADD_IMAGES_TO_GALERY,
    CLEAR_FORM, DISPLAY_IMAGE_TO_MAIN_SCREEN, GALERIES_LIST_SYNC,
    GALERY_DELETE,
    GALERY_EDITOR_ENABLE,
    GALERY_SAVE, MODAL_CLOSE, MODAL_OPEN,
    ON_CHANGE_DATE,
    ON_CHANGE_TEXT, SET_GALERY_MAIN_IMAGE
} from "../../actions/types";
import UniqeGenerator from "../../lib/UniqeGenerator";


export default function (state = GaleriesState, action) {
    switch (action.type) {
        case ON_CHANGE_TEXT:
            let stCopy = {...state.processingGalery}
            stCopy[action.payload.key] = action.payload.val
            return {
                ...state,
                processingGalery: stCopy
            }
        case ON_CHANGE_DATE:
            let stdCopy = {...state.processingGalery}
            stdCopy.date = action.payload
            return {
                ...state,
                processingGalery: stdCopy
            }
        case GALERY_SAVE:
            let galArrCopy = [...state.galeriesList]
            let galeryDataCopy = {...state.processingGalery}
            if (galeryDataCopy.id === null) {
                galeryDataCopy.id = UniqeGenerator.getKey(5)
                galArrCopy.push(galeryDataCopy)
            } else {
                galArrCopy.forEach((el,key)=>{
                    if(el.id === galeryDataCopy.id){
                        galArrCopy[key] = galeryDataCopy
                    }
                })

            }

            sessionStorage.setItem('galeriesList',JSON.stringify(galArrCopy))
            return {
                ...state,
                galeriesList: galArrCopy,
                processingGalery: galeryDataCopy
            }
        case CLEAR_FORM:
            let procCopy = {...state.processingGalery}
            procCopy.id = null
            procCopy.name = ''
            procCopy.desc = ''
            procCopy.date = new Date()
            return {
                ...state,
                processingGalery: procCopy
            }
        case GALERY_EDITOR_ENABLE:

            let galToEdit
            state.galeriesList.forEach((val)=>{
                if(val.id === action.payload){
                    galToEdit = {...val}
                }
            })
            return {
                ...state,
                processingGalery:galToEdit
            }
        case GALERY_DELETE:
            console.log(action.payload)
            let galListCopy = [...state.galeriesList]
            galListCopy.forEach((val, key)=>{
                if(val.id === action.payload){
                    galListCopy.splice(key, 1)
                }
        })

            sessionStorage.setItem('galeriesList',JSON.stringify(galListCopy))
            return {
                ...state,
                galeriesList:galListCopy
            }
        case MODAL_OPEN:
            const selectedImages = {...state.galeriesImages}
            if(typeof selectedImages[action.payload.galeryId]!=='undefined') {
                selectedImages[action.payload.galeryId].forEach(item => {
                    let file_name = item.file_name
                    action.payload.data.forEach(image => {
                        if (image.file_name === file_name) {
                            image.selected = 1
                        }
                    })
                })
            }
            return {
                ...state,
                selectImageModalVis:true,
                allImages:action.payload.data
            }
        case MODAL_CLOSE:
            return {
                ...state,
                selectImageModalVis:false
            }
        case GALERIES_LIST_SYNC:  /*Just for development. Remove It for Prodaction (and Action Crearor)!!!!!*/
              const  galListCopy1 = action.payload
                return({
                    ...state,
                    galeriesList:galListCopy1
                })
        case ADD_IMAGES_TO_GALERY:
            const imgObgCopy = {...state.galeriesImages}
            imgObgCopy[action.payload.galeryId]=action.payload.imagesObject
            return {
                ...state,
                galeriesImages: imgObgCopy
            }
        case DISPLAY_IMAGE_TO_MAIN_SCREEN:
            const galeriesImagesCopy = {...state.galeriesImages} /*get all images from all galeries*/
            let galImagesArrayCopy = []
            const screenImage = {...action.payload.img}
            try {
                galImagesArrayCopy = [...state.galeriesImages[action.payload.galery_id]]
            }catch (e) {
               console.error('image object not exixt')
            }
            let imgForDisplay = screenImage/*Default val*/
            // find selected image by file name and add or remove display status ===============================
            if(galImagesArrayCopy.length>0){
                galImagesArrayCopy.forEach(img =>{
                    if(img.file_name === screenImage.file_name){
                        img.screen_selected=true
                        imgForDisplay = img

                    }else{
                        img.screen_selected=false
                    }
                })
                galeriesImagesCopy[action.payload.galery_id]=galImagesArrayCopy
            }
            // add image to screen display
            const screenImagesCopy = {...state.screenImages}
            // screenImagesCopy[action.payload.galery_id] = screenImage
            screenImagesCopy[action.payload.galery_id] = imgForDisplay
            return {
                ...state,
                screenImages:screenImagesCopy,
                galeriesImages:galeriesImagesCopy
            }
        case SET_GALERY_MAIN_IMAGE:
            const {isActive, galeryId } = {...action.payload}
                 let allGaleriesImagesCopy = {...state.galeriesImages}, /*get all images from all galeries */
                  galeryImagesCopy = allGaleriesImagesCopy[galeryId],
                     screenImageCopy = {...state.screenImages[galeryId]}
            if(isActive){
                galeryImagesCopy.forEach((item =>{
                    if(item.file_name === screenImageCopy.file_name){
                        item.is_main = true

                    }else{
                        item.is_main = false

                    }
                }))
            }
            else {
                // activeImage.is_main = false
                galeryImagesCopy.forEach(item=>item.is_main = false)
            }
            //
            // state.galeriesImages = galeriesImagesCopy1
            allGaleriesImagesCopy[galeryId] = galeryImagesCopy

            console.log (allGaleriesImagesCopy)
            return{
                ...state,
                galeriesImages:allGaleriesImagesCopy
            }

        default:
            return state
    }

}
