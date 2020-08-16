import React, {Component} from 'react';
import {connect} from "react-redux";
import {Table} from "react-bootstrap";
import '../styles/table.scss'

class ImagesTable extends Component {
    state ={table:''}

    getTable(){
        let urlsDisplayed =[],
            names = []
        if(typeof this.props.galeriesImages[this.props.gal_id] !=='undefined'){
            urlsDisplayed = this.props.galeriesImages[this.props.gal_id]
            urlsDisplayed.forEach(item=>{
                names.push(item.file_name)
            })
        }
        const requestData = {
            method: 'POST',
            body: JSON.stringify({names:names})
        };
        fetch('http://localhost:80/exam_galery/api/get-html', requestData)
            .then(res => {
                return res.text()
            })
            .then((html)=>{
                let tableContainer =document.querySelector('#table_container')
                if(tableContainer) {
                    tableContainer.innerHTML = html
                }
            })}


    render() {
        this.getTable()
        return (
            <Table id="table_container" className="files_table mt-4" striped bordered hover >
            </Table>
        );
    }
}
const matStateToProps =(state)=>({
    galeriesImages:state.galerySetting.galeriesImages
})
export default connect(matStateToProps, {})(ImagesTable);
