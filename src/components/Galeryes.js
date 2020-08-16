import React, {Component} from 'react';
import GaleryForm from "./GaleryForm";
import GaleryesList from "./GaleryesList";

class Galeryes extends Component {
    render() {
        return (
            <div>
                <GaleryForm/>
                <GaleryesList/>
            </div>
        );
    }
}

export default Galeryes;
