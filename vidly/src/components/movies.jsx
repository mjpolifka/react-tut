import React, { Component } from 'react';
import { getMovies, deleteMovie } from '../services/fakeMovieService';
import Like from './common/like'
import Pagination from './common/pagination';

class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 10
  }

  render() { 
    const { movies, pageSize } = this.state;
    const count = movies.length;
    if (count === 0) return <p>There are no movies in the database.</p>;
    return (
      <React.Fragment>
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
        <Pagination itemsCount={count} pageSize={pageSize} onPageChange={this.handlePageChange} />
      </React.Fragment>
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
    console.log(page);
  }
}
 
export default Movies;