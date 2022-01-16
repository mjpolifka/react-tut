import React, { Component } from 'react';
import _ from 'lodash';

import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import { paginate } from '../utils/paginate';

import Pagination from './common/pagination';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: {path: 'title', order: 'asc'}
  }

  componentDidMount() {
    const genres = [{name: 'All Genres', _id: ''}, ...getGenres()]
    this.setState({movies: getMovies(), genres})
  }

  render() { 
    const { pageSize, currentPage, movies: allMovies, genres, selectedGenre, sortColumn } = this.state;
    const {length: count} = this.state.movies;
    
    if (count === 0) return <p>There are no movies in the database.</p>;

    const filtered = selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);

    return (
      <div className='row'>
        <div className="col-2">
          <ListGroup items={genres} selectedItem={selectedGenre} onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p>Showing {filtered.length} movies in the database.</p>
          <MoviesTable movies={movies} sortColumn={sortColumn} onDelete={this.handleDelete} onLike={this.handleLike} onSort={this.handleSort} />
          <Pagination itemsCount={filtered.length} pageSize={pageSize} currentPage={currentPage} onPageChange={this.handlePageChange} />
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
    this.setState({selectedGenre: genre, currentPage: 1})
  }

  handleSort = (sortColumn) => {
    this.setState({sortColumn, currentPage: 1});
  }
}
 
export default Movies;