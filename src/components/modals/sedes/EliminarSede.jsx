import { useNavigate } from 'react-router';

function EliminarSede({ idSede, NombreSede }) {
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  const eliminarSedeRequest = async () => {
    const response = await fetch(`${import.meta.env.VITE_SEDE}${idSede}/`, {
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
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
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
          <div className="modal-body text-center">
            ¿Está seguro que desea eliminar a la sede{' '}
            <strong>{NombreSede}?</strong>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn bg-gradient-secondary"
              data-bs-dismiss="modal"
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
    </div>
  );
}

export default EliminarSede;
