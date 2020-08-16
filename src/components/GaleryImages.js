import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import GaleryImagesScreen from "./GaleryImagesScreen";
import '../styles/galery_images.scss'
import ImagesPreview from "./ImagesPreview";
import SelectImageModal from "./SelectImageModal";
import {connect} from "react-redux";
import ImagesTable from "./ImagesTable";
class GaleryImages extends Component {
    state={galeryName:''}
    getName = (id)=> {
        this.props.galeryList.forEach((el)=>{
            if(el.id === id){
                   this.setState( {galeryName :el.name})
            }
        })
    }
    componentDidMount() {
        if(this.props.galeryList.length ===0){
            this.props.history.push('/')
        }
        this.getName(this.props.match.params.id)

    }

    render() {
        const galeryId = this.props.match.params.id
        return (
            <div cust={galeryId}>
                <NavLink exact to={`/`}>Back to galeries</NavLink>
                <div className="galery_id_container d-flex justify-content-center align-content-center" >
                    <h3 className={`gal_name`}>{this.state.galeryName}</h3>
                </div>
               <GaleryImagesScreen gal_id={galeryId}/>
               <ImagesPreview gal_id={galeryId}/>
               <SelectImageModal gal_id={galeryId}/>
               <ImagesTable gal_id={galeryId}/>
            </div>
        );
    }
}
const mapStateToProps =(state)=>({
    galeryList:state.galerySetting.galeriesList
})

export default connect(mapStateToProps,{})(GaleryImages);
