import React, {Component} from 'react';
import slider from "../lib/slider";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {setGaleryMainImage} from "../actions/galery_setings";

class GaleryImagesScreen extends Component {
    componentDidMount() {
        if(typeof this.props.screenImages[this.props.gal_id] !== 'undefined') {
            const slider = document.getElementById('setmain_slider')
            const inner = slider.querySelector('.inner')
            if (this.props.screenImages[this.props.gal_id].is_main) {
                slider.classList.add('active')
                let leftPos = (+slider.offsetWidth) - (+inner.offsetWidth)
                inner.style.left = leftPos + 'px'
            }
        }
    }

    componentDidUpdate(props, state){
       const slider = document.getElementById('setmain_slider')
        const inner = slider.querySelector('.inner')
        if(this.props.screenImages[props.gal_id].is_main){
            slider.classList.add('active')
            let leftPos = (+slider.offsetWidth)-(+inner.offsetWidth)
            inner.style.left = leftPos+'px'
        }else {
            slider.classList.remove('active')
            inner.style.left=0
        }
    }
    sliderFunc=()=>{
        if(typeof this.props.screenImages[this.props.gal_id] !== 'undefined') {
        const frame =  document.getElementById('setmain_slider')
            slider(frame, this.setMainImage)
        }
    }
    setMainImage = (isActive)=>{
       const dataObj ={
           isActive:isActive,
           galeryId:this.props.gal_id,
           activeImage:this.props.screenImages[this.props.gal_id]||false
       }
       this.props.setGaleryMainImage(dataObj)
}
    htmlSlider = () => {

        return (
            <div className={`set_main`} id={`setmain_slider`}>
                <div className="inner" onMouseDown={this.sliderFunc}></div>
            </div>
        )
    }

    render() {
       let imageUrl = ''

        if(typeof this.props.screenImages[this.props.gal_id] !== 'undefined'){
            imageUrl='http://localhost:80/exam_galery' + this.props.screenImages[this.props.gal_id].file_url
        }
        return (
            <div className={`image_screen`}>
                <div className="image_area">
                    <img src={imageUrl} alt=""/></div>
                <div className="controls_area d-flex justify-content-between align-content-center">
                    {this.htmlSlider()}
                    <div className="edit_delete">
                        <div className="edit"></div>
                        <div className="delete"></div>
                    </div>
                </div>

            </div>
        );
    }
}
GaleryImagesScreen.propTypes = {
    screenImages:PropTypes.object
}
const matStateToProps=(state)=>({
    screenImages: state.galerySetting.screenImages,
})

export default connect(matStateToProps, { setGaleryMainImage })(GaleryImagesScreen);
