import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Alert, Button, Form} from 'react-bootstrap'
import DatePicker from 'react-date-picker'
import '../styles/galery_form.scss'
import {connect} from "react-redux";
import {dateOnChange, galerySave, textOnChange} from "../actions/galery_setings";

class GaleryForm extends Component {
    state = {
        nameErrorAlert:'',
        descErrorAlert:''
    }

    textOnChange =(e)=>{
            const inputElement = e.target,
                onChangeObj = {
                    key: inputElement.name,
                    val: inputElement.value
                }
            this.props.textOnChange(onChangeObj)
            this.errorValidator(inputElement)
    }
    dateInputChange =(val)=>{
        this.props.dateOnChange(val)
    }
    galerySave=()=>{
        let flag = true;
        const form = document.querySelector('.galery_form')
        let inputs = form.querySelectorAll('#galery_name, #galery_description ')
       inputs.forEach((input)=>{
           if(!this.errorValidator(input)){
               flag = false
           }
       })
       if(flag){
          this.props.galerySave()
       }
    }

    errorValidator(element){
        let elName = element.name
        if(element.value==='') {

            let message = elName === 'name' ? 'Name must be fill' : 'Description mast bee fill'
            let alert = <Alert  variant={'danger'}>{message}</Alert>
            if(elName ==='name'){
                this.setState({nameErrorAlert:alert})
            }else{
                this.setState({descErrorAlert:alert})
            }
            return false
        }else{
            if(elName ==='name'){
                this.setState({nameErrorAlert:''})
            }else{
                this.setState({descErrorAlert:''})
            }
        }
        return true

    }
    render()
    {

        return (
            <Form className={`galery_form`}>
                <Form.Group>
                    <Form.Label>Galery Name</Form.Label>
                    {this.state.nameErrorAlert}
                    <Form.Control id="galery_name" name={`name`} type="text" placeholder="galery name" value={this.props.formData.name} onChange={this.textOnChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Galery Description</Form.Label>
                    {this.state.descErrorAlert}
                    <Form.Control id="galery_description" name={`desc`} as="textarea" placeholder="galery description" value={this.props.formData.desc} onChange={this.textOnChange}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Galery Description</Form.Label>
                    <br/>
                    <DatePicker id="galery_date"
                                className={`form-control`}
                                monthPlaceholder={``}
                                dayPlaceholder={``}
                                yearPlaceholder={``}
                                value={this.props.formData.date}
                                onChange={this.dateInputChange}/>
                </Form.Group>
                <Button variant="primary" onClick={(e)=>{e.preventDefault(); this.galerySave()}}>Save</Button>
            </Form>
                

        );
    }
}
GaleryForm.propTypes = {
    formData: PropTypes.object,
    textOnChange:PropTypes.func.isRequired,
    dateOnChange:PropTypes.func.isRequired,
    galerySave:PropTypes.func.isRequired
}
const mapStateToProps = (state) =>({
    formData:state.galerySetting.processingGalery
})



export default connect(mapStateToProps,{textOnChange, dateOnChange, galerySave})( GaleryForm);
