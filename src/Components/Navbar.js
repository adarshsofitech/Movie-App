import React, { Component } from 'react'
import {Link} from 'react-router-dom';
export default class Navbar extends Component {
    render() {
        return (
            <div style={{display:'flex',background:'#25b91345',padding:'0.5',fontFamily:"cursive"}}>
                <div>
                <Link to="/" style={{textDecoration:"none"}}><h1 style={{marginTop:"1rem",marginLeft:"1rem"}}>FakeFlix</h1></Link>
                </div>
                <div style={{marginLeft:"3rem"}}>
                <Link to="/favourites" style={{textDecoration:"none"}}><h2 style={{marginLeft:"0.1rem",marginTop:"1.5rem"}}>Favourites</h2></Link>
                </div>
            </div>
        )
    }
}
