import React, { Component } from 'react';

import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import { paginate } from '../utils/paginate';

import Like from './common/like'
import Pagination from './common/pagination';
import ListGroup from './common/listGroup';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1
  }

  componentDidMount() {
    this.setState({movies: getMovies(), genres: getGenres()})
  }

  render() { 
    const { pageSize, currentPage, movies: allMovies, genres, selectedGenre } = this.state;
    const {length: count} = this.state.movies;
    
    if (count === 0) return <p>There are no movies in the database.</p>;

    const movies = paginate(this.state.movies, currentPage, pageSize);

    return (
      <div className='row'>
        <div className="col-2">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p>Showing {count} movies in the database.</p>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {movies.map(movie => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td><Like onClick={() => this.handleLike(movie)} liked={movie.liked} /></td>
                  <td><button onClick={() => this.handleDelete(movie)} className="btn btn-danger btn-sm">Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination itemsCount={count} pageSize={pageSize} currentPage={currentPage} onPageChange={this.handlePageChange} />
        </div>
        
      </div>
    );
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter(m => m._id !== movie._id)
    this.setState({movies});
  }

  handleLike = (movie) => {
    const movies = this.state.movies.map(m => {
      if(m._id === movie._id) m.liked = !m.liked;
      return m;
    })
    this.setState({movies});
  }

  handlePageChange = (page) => {
    this.setState({currentPage: page})
  }

  handleGenreSelect = (genre) => {
    this.setState({selectedGenre: genre})
  }
}
 
export default Movies;