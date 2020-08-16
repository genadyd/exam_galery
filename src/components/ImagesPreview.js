import React, {Component, Fragment} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";
import {modalOpen, setScreenImage} from "../actions/galery_setings";


class ImagesPreview extends Component {
    modalOpen = () =>{
        this.props.modalOpen(this.props.gal_id)
    }
    setScreenImage = (e, img, key)=>{

        const targ = e.target,
            parentContainer = targ.closest('.images_preview')
        parentContainer.querySelectorAll('.one_image_prev').forEach((item, val)=>{
            item.classList.remove('selected')
        })
        targ.parentNode.classList.add('selected')

        this.props.setScreenImage(img, key, this.props.gal_id)
    }
    prevImages =()=>{
        let preview = <Fragment>
            <div className="one_image_prev col-2"></div>
            <div className="one_image_prev col-2"></div>
            <div className="one_image_prev col-2"></div>
            <div className="one_image_prev col-2"></div>
            <div className="one_image_prev col-2"></div>
        </Fragment>
          if(this.props.galeriesImages[this.props.gal_id]!==undefined) {
              return this.props.galeriesImages[this.props.gal_id].map((img, key) => {
                  let url = 'http://localhost:80/exam_galery' + img.file_url
                  let selected = img.screen_selected ?'selected':''
                  let isMain = img.is_main?'main':'no'
                  return (
                      <div className={`one_image_prev col-2 ${selected} ${isMain}`} key={key} onClick={(e)=>{
                          this.setScreenImage(e, img, key)}}>
                          <img src={url} alt=""/>
                      </div>
                  )
              })
          }else{
              return preview
          }

    }
    render() {
        return (
            <div className={`images_preview row`}>
                {
                    this.prevImages()
                 }

                <div className="one_image_prev plus col-2" onClick={this.modalOpen}>
                    <FontAwesomeIcon icon={faPlus}/>
                </div>

            </div>
        );
    }
}
const mapStateToProps=(state)=>({
   galeriesImages: state.galerySetting.galeriesImages
})
export default connect(mapStateToProps, { modalOpen, setScreenImage })(ImagesPreview);
