import { useState, useEffect } from 'react';
import FormUsuario from './FormUsuario';
import PropTypes from 'prop-types';
import './FormularioUsuario.css';

function AgregarUsuario({
  agregarUsuarioModal,
  setAgregarUsuarioModal,
  setDataParent,
  sedeRequest,
  sedes,
  setSedes,
  groups,
  setGroups,
  groupRequest,
}) {
  const [dataReceived, setDataReceived] = useState(false);
  const accessToken = localStorage.getItem('accessToken');

  const [values, setValues] = useState({
    password: '',
    first_name: '',
    last_name: '',
    email: '',
    deleted_at: null,
    salario: 0,
    cargo: '',
    groups: [],
    sede: [],
  });

  const inputHandler = (name) => {
    return (e) => {
      setValues({ ...values, [name]: e.target.value });
    };
  };

  const agregarUsuario = async () => {
    const response = await fetch(import.meta.env.VITE_FUNCIONARIO, {
      mode: 'cors',
      method: 'post',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        ...values,
        salario: Number(values.salario),
        cargo: values.cargo === '' ? null : values.cargo,
      }),
    });

    if (response.status !== 201) {
      throw new Error(' Error al realizar acción, intente nuevamente.');
    }

    return response;
  };

  const addUser = async (e) => {
    e.preventDefault();
    agregarUsuario()
      .then(() => {
        document.querySelector('#closeAgregarUsuario').click();
        setDataParent(false);
      })
      .catch((e) => alert(e));
    console.log(values);
  };

  const limpiarFormulario = () => {
    setAgregarUsuarioModal(false);
    setValues({
      password: '',
      first_name: '',
      last_name: '',
      email: '',
      deleted_at: null,
      salario: 0,
      cargo: '',
      groups: [],
      sede: [],
    });
  };

  useEffect(() => {
    if (agregarUsuarioModal && sedes === '') {
      sedeRequest().then((data) => {
        setSedes(data);
        groupRequest().then((data) => {
          setGroups(data);
        });
      });
    }
  }, [agregarUsuarioModal]);

  return (
    <div className={agregarUsuarioModal ? ' overlay modal_open' : 'overlay'}>
      <div className="container_card">
        <div className="card-header text-left">
          <h3
            className="font-weight-bolder"
            onClick={() => setAgregarUsuarioModal(true)}
          >
            Agregar Usuario
          </h3>
        </div>

        <div className="card-body p-4 ">
          <FormUsuario
            values={values}
            inputHandler={inputHandler}
            sedes={sedes}
            dataReceived={dataReceived}
            id={'Agregar'}
            onSubmit={addUser}
            groups={groups}
            setValues={setValues}
            setDataReceived={setDataReceived}
            editarUsuarioModal={false}
          />
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
}

export default AgregarUsuario;

AgregarUsuario.propTypes = {
  agregarUsuarioModal: PropTypes.bool.isRequired,
  setAgregarUsuarioModal: PropTypes.func.isRequired,
  setDataParent: PropTypes.func.isRequired,
  sedeRequest: PropTypes.func.isRequired,
  sedes: PropTypes.array.isRequired,
  setSedes: PropTypes.func.isRequired,
  groups: PropTypes.array.isRequired,
  setGroups: PropTypes.func.isRequired,
  groupRequest: PropTypes.func.isRequired,
};

/* 
  
*/
