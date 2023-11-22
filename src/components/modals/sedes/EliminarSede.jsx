import { useNavigate } from 'react-router';

function EliminarSede({
  id,
  NombreSede,
  showModalEliminar,
  setShowModalEliminar,
}) {
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  const eliminarSedeRequest = async () => {
    const response = await fetch(`${import.meta.env.VITE_SEDE}${id}/`, {
      mode: 'cors',
      method: 'delete',
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Algo falló');
        }
        navigate('/dashboard');
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log('Ha ocurrido un error, intente más tarde: ', error);
      });
    return response;
  };

  return (
    <div className={showModalEliminar ? ' overlay modal_open' : 'overlay'}>
      <div className="container_card small_card">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Eliminar a {NombreSede}
          </h5>
          <button
            type="button"
            className="btn-close text-dark"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="d-flex justify-content-center aling-items-center">
          <div>
            ¿Está seguro que desea eliminar a la sede{' '}
            <strong>{NombreSede}?</strong>
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn bg-gradient-secondary"
            onClick={() => setShowModalEliminar(false)}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="btn bg-gradient-primary"
            onClick={eliminarSedeRequest}
            data-bs-dismiss="modal"
          >
            Eliminar sede
          </button>
        </div>
      </div>
    </div>
  );
}

export default EliminarSede;
