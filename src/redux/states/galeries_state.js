 const GaleriesState = {
    processingGalery:{
        id:null,
        name:'',
        desc:'',
        date: new Date()
    },
     galeriesList:[],/*list of galeries*/
     galeriesImages:{},/*object of objects galery id and images array per galery
                        example: {galId1:[{imageObject1},{imageObject2}...{imageObjectn}], galId-n:[{imageObject1},{imageObject2}...{imageObjectn}]}
     */
     allImages:[],
     selectImageModalVis:false,
     galProcessingName:'',
     screenImages:{}
}

export default GaleriesState
