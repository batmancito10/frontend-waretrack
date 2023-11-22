import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import requestApi from '../utils/requestApi';

const AgregarServicioModal = ({
  agregarServicioModal,
  setAgregarServicioModal,
}) => {
  const accessToken = localStorage.getItem('accessToken');
  const [sedes, setSedes] = useState('');
  const [groups, setGroups] = useState('');
  const [groupList, setGroupList] = useState('');
  const [sedeList, setSedeList] = useState([]);
  const [sedeSelected, setSedeSelected] = useState([]);
  const [groupSelected, setGroupSelected] = useState([]);
  const [dataReceived, setDataReceived] = useState(false);

  const [values, setValues] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    sedes: [],
    groups: [],
  });

  const inputHandler = (name) => {
    return (e) => {
      setValues({ ...values, [name]: e.target.value });
    };
  };

  function agregarServicio() {
    requestApi('servicio', 'POST', values)
      .then(() => {
        setAgregarServicioModal(false);
      })
      .catch(alert('la peticion fallo, por favor rectifica la informacion'));
  }

  const sedeRequest = async () => {
    const response = await fetch(import.meta.env.VITE_SEDE, {
      mode: 'cors',
      method: 'get',
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const jsonResponse = await response.json();
    return jsonResponse;
  };

  const addServicio = async (e) => {
    e.preventDefault();
    agregarServicio()
      .then(() => {
        document.querySelector('#closeAgregarUsuario').click();
      })
      .catch((e) => alert(e));
  };

  const limpiarFormulario = () => {
    setAgregarServicioModal(false);
    setValues({
      name: '',
      precio: '',
      descripcion: '',
      groups: [],
      sedes: [],
    });
  };

  const groupRequest = async () => {
    const response = await fetch(import.meta.env.VITE_GROUPS, {
      mode: 'cors',
      method: 'get',
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const jsonResponse = await response.json();
    return jsonResponse;
  };

  useEffect(() => {
    if (agregarServicioModal && sedes === '') {
      sedeRequest().then((data) => {
        setSedes(data);
        groupRequest().then((data) => {
          setGroups(data);
        });
      });
    }
  }, [agregarServicioModal]);

  const changeGroups = (selectedOption) => {
    setGroupSelected(selectedOption);
    const groupData = selectedOption.map((option) => {
      return option.value;
    });
    setValues({ ...values, ['groups']: groupData });
  };
  const changeSedes = (selectedOption) => {
    setSedeSelected(selectedOption);
    const sedeData = selectedOption.map((option) => {
      return option.value;
    });
    setValues({ ...values, ['sedes']: sedeData });
  };

  useEffect(() => {
    if (groups !== undefined && groups.hasOwnProperty(0)) {
      setGroupList(
        groups.map((group) => {
          return { value: group['id'], label: group['name'] };
        })
      );
    }
    if (sedes !== undefined && sedes.hasOwnProperty(0)) {
      setSedeList(
        sedes.map((sede) => {
          return { value: sede['id'], label: sede['nombre'] };
        })
      );
      setDataReceived(true);
    }
    // if (values['sedes'][0] !== undefined) {
    //   setSedeSelected(
    //     values['sedes'].map((sede) => {
    //       return { value: sede['id'], label: sede['nombre'] };
    //     })
    //   );
    //   setGroupSelected(
    //     values['groups'].map((group) => {
    //       return { value: group && group['id'], label: group['nombre'] };
    //     })
    //   );
    // }
  }, [groups, values]);

  return (
    <div className={agregarServicioModal ? ' overlay modal_open' : 'overlay'}>
      <div className="container_card">
        <div className="card-header text-left">
          <h3
            className="font-weight-bolder"
            onClick={() => setAgregarServicioModal(true)}
          >
            Agregar Servicio
          </h3>
        </div>

        <div className="formulario">
          <form
            role="form text-left"
            id={`${'Agregar'}Usuario`}
            onSubmit={addServicio}
          >
            <div className="row mb-3">
              <div className="col-md-6">
                <div className="d-flex gap-2 align-items-center justify-content-between">
                  <label htmlFor={`${'Agregar'}nombre`} className="fs-6 pt-1">
                    Nombre
                  </label>
                  <input
                    value={values['nombre']}
                    className="form-control w-65"
                    type="text"
                    name="nombre"
                    id={`${'Agregar'}nombre`}
                    required
                    onChange={inputHandler('nombre')}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex gap-2 align-items-center justify-content-between">
                  <label
                    htmlFor={`${'Agregar'}descripcion`}
                    className="fs-6 pt-1"
                  >
                    Descripción
                  </label>
                  <input
                    value={values['descripcion']}
                    className="form-control w-65"
                    type="text"
                    name="descripcion"
                    id={`${'Agregar'}descripcion`}
                    required
                    onChange={inputHandler('descripcion')}
                  />
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <div className="d-flex gap-2 align-items-center justify-content-between">
                  <label htmlFor={`${'Agregar'}precio`} className="fs-6 pt-1">
                    Precio
                  </label>
                  <input
                    value={values['precio']}
                    className="form-control w-65"
                    type="number"
                    name="precio"
                    id={`${'Agregar'}precio`}
                    required
                    onChange={inputHandler('precio')}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex gap-2 align-items-center justify-content-between">
                  <label className="fs-6 pt-1">Sede</label>
                  <Select
                    isMulti
                    name="sedes"
                    options={sedeList}
                    id={`${'Agregar'}Sede`}
                    className="w-65"
                    onChange={changeSedes}
                    isSearchable={false}
                    value={sedeSelected}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <div className="d-flex gap-2 align-items-center justify-content-between">
                  <label className="fs-6 pt-1">Grupos</label>
                  {dataReceived ? (
                    <Select
                      isMulti
                      name="groups"
                      options={groupList}
                      id={`${'Agregar'}Groups`}
                      className="w-65"
                      onChange={changeGroups}
                      isSearchable={false}
                      value={groupSelected}
                    />
                  ) : (
                    <select className="form-select w-65">
                      <option value="">Loading...</option>
                    </select>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="card card-footer">
          <div className="d-flex justify-content-end gap-2">
            <button
              className="btn btn-secondary"
              type="button"
              data-bs-dismiss="modal"
              id="closeAgregarUsuario"
              onClick={limpiarFormulario}
            >
              Cancelar
            </button>
            <button
              className="btn btn-primary"
              type="submit"
              form="AgregarUsuario"
            >
              Agregar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgregarServicioModal;
