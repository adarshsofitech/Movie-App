import React, { Component } from 'react';
import { Fragment } from 'react';
import axios from 'axios';
export default class Movies extends Component {
    constructor(){
        super();
        this.state={
            hover:'',
            parr:[1],
            currPage:1,
            movies:[],
            favourites:[]
        }
    }
    async componentDidMount(){
        //For side effects we use this
        // await ke sath async use krna hai
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=a0c466723b8354b16291568427290ec4&language=en-US&page=${this.state.currPage}`);
        let data = res.data
        this.setState({
            movies:[...data.results]
        })
    }
    changeMoveies=async()=>{
        
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=a0c466723b8354b16291568427290ec4&language=en-US&page=${this.state.currPage}`)
        let data = res.data
        this.setState({
            movies:[...data.results]
        })
    }
    handleRight=()=>{
        let temparr = [];
        for(let i=1;i<=this.state.parr.length+1;i++){
            temparr.push(i);
        }
        this.setState({
            parr:[...temparr],
            currPage:this.state.currPage+1
        },this.changeMoveies)
    }
    handleLeft=()=>{
        if(this.state.currPage!==1){
            this.setState({
                currPage:this.state.currPage-1
            },this.changeMoveies)
        }
    }
    handleClick = (value)=>{
        if(value!==this.state.currPage){
            this.setState({
                currPage:value
            },this.changeMoveies)
        }
    }
    handleFavourites = (movie)=>{
        let oldData = JSON.parse(localStorage.getItem("movies-app") || "[]")
        if(this.state.favourites.includes(movie.id)){
            oldData = oldData.filter((m)=>m.id!==movie.id)
        }
        else{
            oldData.push(movie)
        }
        localStorage.setItem("movies-app",JSON.stringify(oldData));
        this.handleFavouriteState();        //synchronus function to direct call krte skte hain otherwise call function provide krna hoga
    }
    handleFavouriteState=()=>{
        let oldData = JSON.parse(localStorage.getItem("movies-app")||"[]");
        let temp = oldData.map((movie)=>movie.id);
        this.setState({
            favourites:[...temp]
        })
    }
    render() {
        return (
            <>
            {   this.state.movies.length === 0 ?
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>:
                <div>
                    <h3 className="text-center"><strong>Trending</strong></h3>
                    <div className="movies-list">
                    {
                        this.state.movies.map((movieObj)=>(
                            <div className="card movies-card" onMouseEnter={()=>this.setState({hover:movieObj.id})} onMouseLeave={()=>this.setState({hover:''})}>
                            <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt={movieObj.title} className="card-img-top movies-img" />
                            <h4 className="card-title movies-title">{movieObj.original_title}</h4>
                            {/* <p class="card-text movies-text">{movie.overview}</p> */}
                            <div className="button-wrapper" style={{display:'flex',width:'100%',justifyContent:'center'}}>
                            {
                                this.state.hover === movieObj.id &&
                                <a  className="btn btn-primary movies-button" onClick={()=>this.handleFavourites(movieObj)}>{this.state.favourites.includes(movieObj.id)?"Remove from favourites":"Add to favourites"}</a>
                            }
                            </div>
                            </div>
                        ))
                    }
                    </div>
                    <div style={{display:'flex',justifyContent:'center'}}>
                    <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        <li class="page-item"><a class="page-link" onClick={this.handleLeft}>Previous</a></li>
                        {
                            this.state.parr.map((value)=>(
                                <li class="page-item"><a class="page-link" onClick={()=>this.handleClick(value)}>{value}</a></li>
                            ))
                        }
                        <li class="page-item"><a class="page-link" onClick={this.handleRight} >Next</a></li>
                    </ul>
                    </nav>
                    </div>
                </div>
            }
            </>
        )
    }
}
