import propTypes from "prop-types";

const Pagination = ({itemsCount, pageSize, onPageChange, currentPage}) => {

  const pagesCount = Math.round(itemsCount / pageSize);
  if (pagesCount === 1) return null;

  const pages = [];
  for (let i=0; i<=pagesCount; i++) {
    pages[i] = i+1;
  }

  return (
    <nav>
      <ul className="pagination">
        {pages.map(page => (
          <li 
            key={page}
            onClick={() => onPageChange(page)}
            className={currentPage === page ? "page-item active" : "page-item"}
          >
            <a className="page-link">{page}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

Pagination.propTypes = {
  itemsCount: propTypes.number.isRequired,
  pageSize: propTypes.number.isRequired,
  currentPage: propTypes.number.isRequired,
  onPageChange: propTypes.func.isRequired
}

export default Pagination;