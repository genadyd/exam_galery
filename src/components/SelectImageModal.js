import React, {Component} from 'react';
import {Button, Modal} from "react-bootstrap";
import {connect} from "react-redux";
import {modalClose, saveImagesToGalery} from "../actions/galery_setings";
import '../styles/modal.scss'

class SelectImageModal extends Component {
    imagesArray = []
    constructor(props){
        super(props)
        this.props = props
        // ---if exists saved gallery files - get them -----------------
        if(typeof this.props.galeryesImagesObject[this.props.gal_id] !=='undefined' ){
            this.imagesArray = [...this.props.galeryesImagesObject[this.props.gal_id]]
        }
    }
    getAllImages=()=>{
        return this.props.allImages.map((el, key)=>{
            let selected = el.selected===1?'selected':''
            return <div className={`one_image col-3 ${selected}`} key={key} onClick={(e)=>{this.addImageToGalery(e, el)}}>
                <img className={`im`} src={`http://localhost/exam_galery${el.file_url}`} alt={``}/>
            </div>
        })
    }
    addImageToGalery=(event, elementImg)=>{
        const element = event.target.parentNode
        if(element.classList.contains('selected')){
            element.classList.remove('selected')
            this.imagesArray.forEach((val,index)=>{
                if(val.file_name === elementImg.file_name){
                    this.imagesArray.splice(index, 1)
                }
            })
        }else{
            if(this.imagesArray.length<5 && +elementImg.file_size_mb<=10) {
                event.target.parentNode.classList.add('selected')
                elementImg['is_main']=false
                elementImg['screen_selected']=false
                this.imagesArray.push(elementImg)
            }
        }
    }
    galeryImagesSave=()=>{
        const galeryId = this.props.gal_id,
            imagesObject = this.imagesArray
        this.props.saveImagesToGalery(galeryId, imagesObject)
        this.props.modalClose()
    //    set status to table===================
       const tableRows = [...document.querySelectorAll('.t_row')]

        let fileName = ''
        tableRows.forEach(row =>{
            fileName = row.querySelector('.file_name').textContent
            row.querySelector('.use').textContent = 'לא'
          imagesObject.forEach(im=>{
              if(im.file_name === fileName) {
                  row.querySelector('.use').textContent = 'כן'
              }
            })
        })
    }
    render() {
        return (
            <>
                <Modal
                    show={this.props.modalVis}
                    onHide={() => this.props.modalClose()}
                    dialogClassName="modal-90w"
                    aria-labelledby="example-custom-modal-styling-title"
                    gal_id={this.props.gal_id}
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title">
                            Select Galery Images
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                           <div className="images_container row justify-content-start ">
                               {this.getAllImages()}
                           </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.galeryImagesSave}>Save</Button>
                    </Modal.Footer>
                </Modal>
                </>

        );
    }
}
const mapStateToProps=(state)=>({
    modalVis: state.galerySetting.selectImageModalVis,
    allImages:state.galerySetting.allImages,
    galeryesImagesObject:state.galerySetting.galeriesImages
})
export default connect(mapStateToProps, {modalClose, saveImagesToGalery})(SelectImageModal);
