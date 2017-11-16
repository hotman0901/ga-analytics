import React,{Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import "./main.scss";
class Header extends Component {
    changeSelect()
    {
        if(this.select !== '')
        {
            this.props.history.push(`/${this.select.value}`)
        }
    }
    render() {
        return (
            <div className="header">
                <select name="" id="" ref={(e)=>{this.select = e}} onChange={()=> this.changeSelect()}>
                    <option value="page1">CIRCLE</option>
                    <option value="page2">LINE</option>
                    <option value="page3">COLUMN</option>
                    <option value="page4">BAR</option>
                    <option value="page5">TABLE</option>
                    <option value="page7">Report Data</option>
                </select>
                {/*                 
                <Link to="/page1">CIRCLE  </Link>
                <Link to="/page2">LINE  </Link>
                <Link to="/page3">COLUMN  </Link> 
                <Link to="/page4">BAR  </Link> 
                <Link to="/page5">TABLE  </Link> 
                <br/>
                <Link to="/page7">Report Data  </Link>  
                */}
                <br/>
                <a href="https://developers.google.com/analytics/devguides/reporting/embed/v1/component-reference#datachart-options" target="_blank">doc </a>
                <a href="https://developers.google.com/analytics/devguides/reporting/core/dimsmets" target="_blank">dimension </a>
                <a href="https://support.google.com/analytics/answer/1033861?hl=zh-Hant" target="_blank">dimension & metrics </a>

                
            </div>
        );
    }
}

export default withRouter(Header)