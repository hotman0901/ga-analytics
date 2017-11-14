import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import "./main.scss";
export default class Header extends Component {

    render() {
        return (
            <div className="header">
                <Link to="/page1">CIRCLE  </Link>
                <Link to="/page2">LINE  </Link>
                <Link to="/page3">COLUMN  </Link> 
                <Link to="/page4">BAR  </Link> 
                <Link to="/page5">TABLE  </Link> 
                <br/>
                <Link to="/page7">Report Data  </Link> 
                <br/>
                <a href="https://developers.google.com/analytics/devguides/reporting/embed/v1/component-reference#datachart-options" target="_blank">doc </a>
                <a href="https://developers.google.com/analytics/devguides/reporting/core/dimsmets" target="_blank">dimension </a>
                <a href="https://support.google.com/analytics/answer/1033861?hl=zh-Hant" target="_blank">dimension & metrics </a>

                
            </div>
        );
    }
}