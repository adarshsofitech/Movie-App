import React, { Component } from 'react'
import { movies } from './getMovies'
export default class Favourite extends Component {
    constructor() {
        super()
        this.state = {
            genres: [],
            currGenre: 'All Genres',
            movie: [],
            currText: '',
            limit: 5,
            currPage: 1
        }
    }
    componentDidMount() {
        let genreids = {
            28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
            27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
        };
        let data = JSON.parse(localStorage.getItem("movies-app") || "[]");
        let temp = [];
        data.forEach((movieObj) => {
            if (!temp.includes(genreids[movieObj.genre_ids[0]])) {
                temp.push(genreids[movieObj.genre_ids[0]]);
            }
        })
        temp.unshift('All Genres');
        this.setState({
            genres: [...temp],
            movie: [...data]
        })
    }
    handleGenreChange = (genre) => {
        this.setState({
            currGenre: genre
        })
    }
    sortPopularityDes = () => {
        let temp = this.state.movie;
        temp.sort(function (objA, objB) {
            return objB.popularity - objA.popularity
        })
        this.setState({
            movie: [...temp]
        })
    }
    sortPopularityAsc = () => {
        let temp = this.state.movie;
        temp.sort(function (objB, objA) {
            return objB.popularity - objA.popularity
        })
        this.setState({
            movie: [...temp]
        })
    }
    sortRatingDes = () => {
        let temp = this.state.movie;
        temp.sort(function (objA, objB) {
            return objB.vote_average - objA.vote_average
        })
        this.setState({
            movie: [...temp]
        })
    }
    sortRatingAsc = () => {
        let temp = this.state.movie;
        temp.sort(function (objB, objA) {
            return objB.vote_average - objA.vote_average
        })
        this.setState({
            movie: [...temp]
        })
    }
    handlePageChange = (page) => {
        this.setState({
            currPage: page
        })
    }
    handleDelete=(id)=>{
        let newarr=[];
        newarr = this.state.movie.filter((movieObj)=>movieObj.id!==id)
        this.setState({
            movie:[...newarr]
        })
        localStorage.setItem("movies-app",JSON.stringify(newarr))
    }
    render() {
        let genreids = {
            28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
            27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
        };
        let filterarr = [];
        if (this.state.currText == '') {
            filterarr = this.state.movie
        }
        else {
            filterarr = this.state.movie.filter((movieObj) => {
                let title = movieObj.original_title.toLowerCase();
                return title.includes(this.state.currText.toLocaleLowerCase())
            })
        }
        if (this.state.currGenre !== "All Genres") {
            filterarr = this.state.movie.filter((movieObj) => genreids[movieObj.genre_ids[0]] == this.state.currGenre)
            // console.log(filterarr);
        }
        // console.log(this.state.currText)
        let pages = this.state.limit>0?Math.ceil(filterarr.length / this.state.limit):0;
        let pagesarr = [];
        for (let i = 1; i <= pages; i++) {
            pagesarr.push(i);
        }
        let si = (this.state.currPage - 1) * this.state.limit
        let ei = si + this.state.limit;
        filterarr = filterarr.slice(si, ei);
        return (
            <>
                <div className="main">
                    <div className="row">
                        <div className="col-lg-3 col-sm-12">
                            <ul class="list-group favourites-generes">
                                {
                                    this.state.genres.map((genreObj) => (
                                        this.state.currGenre === genreObj ?
                                            <li class="list-group-item" style={{ background: "#3f51b5", color: "white", fontWeight: "bold" }}>{genreObj}</li>
                                            :
                                            <li class="list-group-item" style={{ background: "white", color: "black" }} onClick={() => this.handleGenreChange(genreObj)} >{genreObj}</li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="col-lg-9 favourites-table col-sm-12">
                            <div className="row">
                                <input type="text" className="input-group-text col" placeholder="Search" value={this.state.currText} onChange={(e) => this.setState({currText:e.target.value})} />
                                <input type="number" className="input-group-text col" placeholder="Rows Count" value={this.state.limit} onChange={(i)=>this.setState({limit:i.target.value})}/>
                            </div>
                            <div className="row">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Title</th>
                                            <th scope="col">Genre</th>
                                            <th scope="col"><i class="fas fa-sort-up upDown" onClick={this.sortPopularityDes}></i>Popularity<i className="fas fa-sort-down upDown" onClick={this.sortPopularityAsc}></i></th>
                                            <th scope="col"><i class="fas fa-sort-up upDown" onClick={this.sortRatingDes}></i>Rating<i className="fas fa-sort-down upDown" onClick={this.sortRatingAsc}></i></th>
                                            <th scope="col">Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            filterarr.map((movieObj) => (
                                                <tr>
                                                    <td> <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt={movieObj.title} style={{ width: "5rem" }} /> {movieObj.original_title}</td>
                                                    <td>{genreids[movieObj.genre_ids[0]]}</td>
                                                    <td>{movieObj.popularity}</td>
                                                    <td>{movieObj.vote_average}</td>
                                                    <td><button type="button" class="btn btn-danger" onClick={()=>this.handleDelete(movieObj.id)}>Delete</button></td>

                                                </tr>

                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <nav aria-label="Page navigation example">
                                    <ul class="pagination">
                                        {/* <li class="page-item"><a class="page-link" onClick={this.handleLeft}>Previous</a></li> */}
                                        {
                                            pagesarr.map((pag) => (
                                                <li className="page-item"><a class="page-link" onClick={()=>this.handlePageChange(pag)} >{pag}</a></li>
                                            ))
                                        }
                                        {/* <li class="page-item"><a class="page-link" onClick={this.handleRight} >Next</a></li> */}
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}


// {
//     pagesarr.map((page)=>{
//         <li class="page-item"><a class="page-link" onClick={()=>this.handlePageChange(page)}>{page}</a></li>

//     })
// }