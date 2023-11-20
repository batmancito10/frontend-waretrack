import { useContext, useEffect, useState } from 'react';
import { PageTitle } from '../../../App';
import Select from 'react-select';
import './Proveedores.css';

function AgregarProveedor() {
  const accessToken = localStorage.getItem('accessToken');
  const { setTitle } = useContext(PageTitle);
  const [sedeList, setSedeList] = useState([]);
  const [dataReceived, setDataRecived] = useState(false);
  const [values, setValues] = useState([]);

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [sedeSelected, setSedeSelected] = useState([]);

  const [showModalProveedor, setShowModalProveedor] = useState(false);

  useEffect(() => {
    fetch(import.meta.env.VITE_SEDE, {
      mode: 'cors',
      method: 'get',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSedeList(data);
        const dataTransformed = data.map((sede) => ({
          value: sede.id,
          label: sede.nombre,
        }));

        setSedeList(dataTransformed);
        setDataRecived(true);
      })
      .catch((error) => {
        console.error('Hubo un error al obtener las opciones:', error);
      });
  }, [setTitle]);

  const handleChange = (selectedOption) => {
    setSedeSelected(selectedOption);
    setValues(selectedOption.map((option) => option.value));
  };

  const handleChangeEmail = (e) => {
    const nuevoEmail = e.target.value;
    setEmail(nuevoEmail);
  };

  const handleChangeNombre = (e) => {
    const nuevoNombre = e.target.value;
    setNombre(nuevoNombre);
  };

  const handleChangeDireccion = (e) => {
    const nuevoDireccion = e.target.value;
    setDireccion(nuevoDireccion);
  };

  const handleChangeTelefono = (e) => {
    const nuevoTelefono = e.target.value;
    setTelefono(nuevoTelefono);
  };

  const data = {
    nombre: nombre,
    direccion: direccion,
    telefono: telefono,
    email: email,
    sede: values,
  };

  const agregarProveedorRequest = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_PROVEEDOR, {
        mode: 'cors',
        method: 'post',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
    } catch (error) {
      console.error('Ha ocurrido un error: ', error);
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-outline-default btn-lg w-100"
        onClick={() => setShowModalProveedor(true)}
      >
        <i className="bi bi-person-add fs-5 py-0 me-2"></i>
        Agregar proveedor
      </button>

      <div className={showModalProveedor ? ' overlay modal_open' : 'overlay'}>
        <div className="container_card">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Agregar proveedor
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
          <div className="modal-body">
            <form role="form text-left" id="editarProveedor">
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
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex gap-2 align-items-center justify-content-between">
                    <label className="fs-6 pt-1">Email</label>
                    <input
                      className="form-control w-65"
                      type="email"
                      name="email"
                      value={email}
                      onChange={handleChangeEmail}
                    />
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <div className="d-flex gap-2 align-items-center justify-content-between">
                    <label className="fs-6 pt-1">Direccion</label>
                    <input
                      type="text"
                      name="direccion"
                      className="form-control w-65"
                      value={direccion}
                      onChange={handleChangeDireccion}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex gap-2 align-items-center justify-content-between">
                    <label className="fs-6 pt-1">Sede</label>
                    {dataReceived ? (
                      <Select
                        name="sede"
                        options={sedeList.map((option) => ({
                          ...option,
                        }))}
                        className="w-65"
                        onChange={handleChange}
                        isMulti
                        value={sedeSelected}
                      />
                    ) : (
                      <select className="form-select w-65">
                        <option value="">Loading...</option>
                      </select>
                    )}
                  </div>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <div className="d-flex gap-2 align-items-center justify-content-between">
                    <label className="fs-6 pt-1">Telefono</label>
                    <input
                      className="form-control w-65"
                      type="text"
                      name="telefono"
                      min="0"
                      value={telefono}
                      onChange={handleChangeTelefono}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn bg-gradient-secondary"
              onClick={() => setShowModalProveedor(false)}
            >
              Cancelar
            </button>
            <button
              className="btn btn-primary"
              type="submit"
              form="AgregarUsuario"
              data-bs-dismiss="modal"
              onClick={agregarProveedorRequest}
            >
              Agregar proveedor
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AgregarProveedor;
