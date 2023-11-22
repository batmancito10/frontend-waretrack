const Paginacion = ({ currentPage, pageCount, setCurrentPage }) => {
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pageCount) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="pagination flex justify-content-center align-items-center flex-column">
      <span>{`Página ${currentPage} de ${pageCount}`}</span>
      <div
        className="d-flex justify-content-center gap-2"
        style={{ fontSize: '30px', margin: '5px' }}
      >
        <button
          className="btn btn-primary text-xxl"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <p className="text-xxl text-white">{'<'}</p>
        </button>
        <button
          className="btn btn-primary"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <p className="text-xxl text-white">{'>'}</p>
        </button>
      </div>
    </div>
  );
};

export default Paginacion;
