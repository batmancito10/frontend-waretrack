import { useState } from 'react';
import requestApi from '../../utils/requestApi';

const AgregarSede = () => {
  const accessToken = localStorage.getItem('accessToken');

  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [ciudad, setCiudad] = useState('');

  const [showModalSede, setShowModalSede] = useState(false);

  const handleChangeNombre = (e) => {
    const nuevoNombre = e.target.value;
    setNombre(nuevoNombre);
  };

  const handleChangeCiudad = (e) => {
    const nuevoCiudad = e.target.value;
    setCiudad(nuevoCiudad);
  };

  const handleChangeDireccion = (e) => {
    const nuevoDireccion = e.target.value;
    setDireccion(nuevoDireccion);
  };
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const data = {
    nombre: nombre,
    direccion: direccion,
    ciudad: ciudad,
    company: userInfo?.company?.id,
  };

  function agregarSede() {
    requestApi('sede', 'POST', data)
      .then(() => setShowModalSede(false))
      .catch(() => alert('no se puede agregar esta sede, verifica los campos'));
  }

  return (
    <>
      {' '}
      <button
        type="button"
        className="btn btn-outline-default btn-lg w-100"
        onClick={() => setShowModalSede(true)}
      >
        <i className="bi bi-box fs-5 py-0 me-2"></i>
        Agregar sede
      </button>
      <div className={showModalSede ? ' overlay modal_open' : 'overlay'}>
        <div className="container_card">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Agregar sede
            </h5>
            <button
              type="button"
              className="btn-close text-dark"
              onClick={() => setShowModalSede(false)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form role="form text-left" id="editarProveedor" className="mt-6">
              <div className="row mb-3">
                <div className="col-md-6">
                  <div className="d-flex gap-2 align-items-center justify-content-between">
                    <label className="fs-6 pt-1">Nombre</label>
                    <input
                      className="form-control w-65"
                      type="text"
                      name="first-name"
                      value={nombre}
                      onChange={handleChangeNombre}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex gap-2 align-items-center justify-content-between">
                    <label className="fs-6 pt-1">Direccion</label>
                    <input
                      type="text"
                      name="direccion"
                      className="form-control w-65"
                      value={direccion}
                      onChange={handleChangeDireccion}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <div className="d-flex gap-2 align-items-center justify-content-between">
                    <label className="fs-6 pt-1">Ciudad</label>
                    <input
                      type="text"
                      name="ciudad"
                      className="form-control w-65"
                      value={ciudad}
                      onChange={handleChangeCiudad}
                      required
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn bg-gradient-secondary mx-2"
              onClick={() => setShowModalSede(false)}
            >
              Cancelar
            </button>
            <button
              className="btn btn-primary"
              type="submit"
              form="AgregarUsuario"
              data-bs-dismiss="modal"
              onClick={agregarSede}
            >
              Agregar sede
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AgregarSede;
