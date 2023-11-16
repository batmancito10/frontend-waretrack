import PropTypes from 'prop-types';
import './FormularioUsuario.css';

function EliminarUsuario({
  usuario,
  setDataParent,
  eliminarUsuarioModal,
  setEliminarUsuarioModal,
}) {
  const accessToken = localStorage.getItem('accessToken');
  const eliminarUsuario = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_FUNCIONARIO}${usuario['id']}`,
      {
        mode: 'cors',
        method: 'delete',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-type': 'application/json',
        },
      }
    );

    if (response.status !== 204) {
      throw new Error(' Error al realizar acción, intente nuevamente.');
    }

    return response;
  };

  const deleteUser = () => {
    eliminarUsuario().then(() => {
      document.querySelector('#closeEliminarUsuario').click();
      setDataParent(false);
    });
  };

  return (
    <div className={eliminarUsuarioModal ? 'overlay modal_open' : 'overlay'}>
      <div className="container_card">
        <div className="modal-body p-0">
          <div className="card card-plain">
            <div className="card-header text-left">
              <h3 className="font-weight-bolder">Eliminar Usuario</h3>
            </div>
            <div className="card-body p-4 ">
              <h6>¿Desea eliminar a este usuario?</h6>
              <div>
                <h6>Nombre:</h6>
                <span className="ps-4">{`${usuario && usuario['first_name']} ${
                  usuario && usuario['last_name']
                }`}</span>
                <h6>Cargo:</h6>
                <span className="ps-4">{`${usuario && usuario['cargo']}`}</span>
                <h6>Sede:</h6>
                <span className="ps-4">{`${
                  usuario && usuario['sede'][0]['nombre']
                }`}</span>
              </div>
            </div>
            <div className="card card-footer">
              <div className="d-flex justify-content-end gap-2">
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={() => setEliminarUsuarioModal(false)}
                >
                  Cancelar
                </button>
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={deleteUser}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EliminarUsuario;

EliminarUsuario.propTypes = {
  usuario: PropTypes.object.isRequired,
  setDataParent: PropTypes.func.isRequired,
  eliminarUsuarioModal: PropTypes.bool.isRequired,
  setEliminarUsuarioModal: PropTypes.func.isRequired,
};
