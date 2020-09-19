
import './Carrousel.css' 
import Paper from '@material-ui/core/Paper';
import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { connect } from "react-redux";
 
function Carrousel(props)
{
    var items = [
        {
            name: "CREEMOS",
            
            picture:"https://media-exp1.licdn.com/dms/image/C4E22AQF4JSLUCT__gA/feedshare-shrink_800-alternative/0?e=1602720000&v=beta&t=SlNmNNKuJ1BORNqltbGJjx6xA6KMF48YYM85hBIZgD8",
        },
        {
            name: "EN VOS",
            
            picture:"https://media-exp1.licdn.com/dms/image/C4E22AQGY3s-1Hp0sFg/feedshare-shrink_800-alternative/0?e=1602720000&v=beta&t=-lJ3SySf_Esty9wmes6-2GkuSoofkT3wuegwogHtobU"

        },
        {
            name: "POR ESO",
            
            picture:"https://media-exp1.licdn.com/dms/image/C4E22AQG5K2CfQhQv9Q/feedshare-shrink_800-alternative/0?e=1602720000&v=beta&t=X8Zs-tLhGvmB9ZtSrLddWoejAfIbKwy31YsqMEMP87M"
        },
        {
            name: "INVERTIMOS",
            
            picture:"https://media-exp1.licdn.com/dms/image/C4E22AQGE52IVLetXFQ/feedshare-shrink_800-alternative/0?e=1602720000&v=beta&t=WLEOHbh1U7fieQJfexkjFQj83ETLMw3jfMuT6Wfr6bM"
        },
        {
            name: "EN VOS",
            
            picture:"https://media-exp1.licdn.com/dms/image/C4E22AQFCWuoQZRhrIA/feedshare-shrink_800-alternative/0?e=1602720000&v=beta&t=088_GimEv5W0g0XDcPvslV_fK1MexOQM6lg-K-4ZtY8"
        }

        
    ]
 
    return (
        <div className="contenedor">
            
        <Carousel>
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
        </div>
    )
}
 
function Item(props)
{
    return (
        <div className = "doc">
        <Paper>
        <div className='color'>
            <h2>{props.item.name}</h2>
            <p>{props.item.description}</p>
            </div>
            <div >
            <img class="box" src={props.item.picture} alt="" />
        </div>
        </Paper>
        </div>
    )
}

  


export default connect()(Carrousel)
