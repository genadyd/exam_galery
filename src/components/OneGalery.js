import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencilAlt, faQuestionCircle, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {NavLink } from 'react-router-dom'

class OneGalery extends Component {
    deleteGalery = key=>{
        this.props.galeryDelete(key)
    }
    editEnable = (key) => {
        this.props.galeryEditEnable(key)
    }
    render() {
        let key = this.props.index,
            el = this.props.el
            el.date = new Date(el.date)
        return (

            <div className={`one_galery p-2 mb-2`}  custom_param={key}>
                <div className={`one_galery_header row justify-content-between align-items-center`}>

                    <div className="col galery_name">
                        <NavLink exact to={`/galery-images/${el.id}`}>{el.name}</NavLink>
                    </div>
                    <div className="col date">{el.date.getDate() + '/' + (+el.date.getMonth() + 1) + '/' + el.date.getFullYear()}</div>
                    <div className="col-2 controls d-flex justify-content-center align-items-center">
                        <div className="edit" onClick={(e) => {
                            this.editEnable(key)
                        }}><FontAwesomeIcon icon={faPencilAlt}/></div>
                        &nbsp; &nbsp;
                        <div className="delete" onClick={(e)=>{
                            if (window.confirm('you really want to delete this')) {
                                this.deleteGalery(el.id)
                            }
                        }}><FontAwesomeIcon icon={faTrashAlt}/></div>
                        &nbsp; &nbsp;
                        <div className="info"><FontAwesomeIcon icon={faQuestionCircle}/></div>
                    </div>
                </div>
                <div className={`galery_body hidden`}>
                    <hr/>
                    <p>{el.desc}</p>
                </div>
            </div>

        );
    }
}

export default OneGalery;
