import React, { Component } from 'react';
import _ from 'lodash';
import { toast } from 'react-toastify';

// import { getMovies } from '../services/fakeMovieService';
import { deleteMovie, getMovies } from '../services/movieService';
// import { getGenres } from '../services/fakeGenreService';
import { getGenres } from '../services/genreService';
import { paginate } from '../utils/paginate';

import Pagination from './common/pagination';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';
import { Link } from 'react-router-dom';
import SearchBox from './searchBox';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: 'title', order: 'asc' }
  }

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ name: 'All Genres', _id: '' }, ...data];

    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
  }

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter(m => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    }
    catch (ex) {
      if (ex.response && ex.response.status === 404)
      toast.error('This movie does not exist.');
    }
  }

  render() {
    const { pageSize, currentPage, genres, selectedGenre, sortColumn, searchQuery } = this.state;
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
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <MoviesTable movies={movies} sortColumn={sortColumn} onDelete={this.handleDelete} onLike={this.handleLike} onSort={this.handleSort} />
          <Pagination itemsCount={totalCount} pageSize={pageSize} currentPage={currentPage} onPageChange={this.handlePageChange} />
        </div>

      </div>
    );
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
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 })
  }

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 })
  }

  handleSort = (sortColumn) => {
    this.setState({ sortColumn, currentPage: 1 });
  }

  getPagedData = () => {
    const { pageSize, currentPage, sortColumn, selectedGenre, searchQuery, movies: allMovies } = this.state;

    let filtered = allMovies;
    if (searchQuery) {
      filtered = allMovies.filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    else if (selectedGenre && selectedGenre._id) {
      filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);
    }

    // const filtered = selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  }
}

export default Movies;