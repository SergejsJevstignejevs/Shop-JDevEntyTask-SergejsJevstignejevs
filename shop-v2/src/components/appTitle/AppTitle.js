import React from "react";

import './AppTitle.css';

export default class AppTitle extends React.Component {

    render(){
 
        return (
            <div className="AppTitle">
                {this.props.selectedCategory}
            </div>
        );
        
    }
}