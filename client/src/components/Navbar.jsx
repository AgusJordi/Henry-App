import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import HelpIcon from '@material-ui/icons/Help';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import './Navbar.css'
var lsName = localStorage.getItem('username')




function Navbar() {
    return (
    	<div className ="navbar">
    		<div className = "navbar_left">
    		    <HelpIcon />
    			<AccessTimeIcon />
    		</div>
    		<div className = "navbar_search">
    			<SearchIcon />
    			<input 
    			      className= "navbar_search"
    			      placeholder= "Buscar en Henry" 
    			      />      
    		</div>
    		<div>
    		<img
                    src="https://emojis.wiki/emoji-pics/apple/rocket-apple.png"
                    alt=""
                    /></div>
    		<div className = "navbar_right">
    			<AccountCircleIcon />
				<span style={{marginRight: "12px"}}>Bienvenido <small><b>
					{lsName.charAt(0).toUpperCase() + lsName.slice(1)}

					</b></small></span>
    		</div>
    	</div>
    	)
}

export default Navbar;