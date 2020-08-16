import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import '../styles/galery_list.scss'
import {galeryDelete, galeryEditEnable} from "../actions/galery_setings";
import OneGalery from "./OneGalery";
import {syncGaleryListState} from "../actions/sess_storage_sinc";


class GaleryesList extends Component {

    state = {
        infoState: []
    }

    componentDidMount() {
        this.props.syncGaleryListState()
    }


    render() {
        // this.props.syncGaleryListState()
        return (
            <div className='gal_list_container'>
                <div className={`list_container_header row justify-content-between align-items-center mb-3`}>
                    <div className={`col`}>Galery Name</div>
                    <div className={`col`}>Galery Edit Date</div>
                    <div className={`col-2`}></div>
                </div>
                {
                    // this.oneGalComponent(this.props.galList)
                    this.props.galList.map((el, key) => (
                        <OneGalery el={el} index={el.id} key={el.id} galeryEditEnable={this.props.galeryEditEnable}
                                   galeryDelete={this.props.galeryDelete}
                        />
                    ))
                }

            </div>
        );
    }
}

GaleryesList.propTypes = {
    galList: PropTypes.array,
    galeryEditEnable: PropTypes.func.isRequired,
    galeryDelete: PropTypes.func.isRequired,
    syncGaleryListState: PropTypes.func.isRequired
}
const mapStateToProps = (state) => ({
    galList: state.galerySetting.galeriesList
})
export default connect(mapStateToProps, {galeryEditEnable, galeryDelete, syncGaleryListState})(GaleryesList);
