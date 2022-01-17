import React, { Component } from 'react';
import _ from 'lodash';

import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import { paginate } from '../utils/paginate';

import Pagination from './common/pagination';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';
import { Link } from 'react-router-dom';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: 'title', order: 'asc' }
  }

  componentDidMount() {
    const genres = [{ name: 'All Genres', _id: '' }, ...getGenres()]
    this.setState({ movies: getMovies(), genres })
  }

  render() {
    const { pageSize, currentPage, genres, selectedGenre, sortColumn } = this.state;
    const { length: count } = this.state.movies;

    if (count === 0) return <p>There are no movies in the database.</p>;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className='row'>
        <div className="col-2">
          <ListGroup items={genres} selectedItem={selectedGenre} onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <Link
            to="/movies/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Movie
          </Link>
          <p>Showing {totalCount} movies in the database.</p>
          <MoviesTable movies={movies} sortColumn={sortColumn} onDelete={this.handleDelete} onLike={this.handleLike} onSort={this.handleSort} />
          <Pagination itemsCount={totalCount} pageSize={pageSize} currentPage={currentPage} onPageChange={this.handlePageChange} />
        </div>

      </div>
    );
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter(m => m._id !== movie._id)
    this.setState({ movies });
  }

  handleLike = (movie) => {
    const movies = this.state.movies.map(m => {
      if (m._id === movie._id) m.liked = !m.liked;
      return m;
    })
    this.setState({ movies });
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page })
  }

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 })
  }

  handleSort = (sortColumn) => {
    this.setState({ sortColumn, currentPage: 1 });
  }

  getPagedData = () => {
    const { pageSize, currentPage, sortColumn, selectedGenre, movies: allMovies } = this.state;

    const filtered = selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  }
}

export default Movies;