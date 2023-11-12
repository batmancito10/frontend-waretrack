import { useState, useEffect } from 'react';
import FormUsuario from './FormUsuario';
import './FormularioUsuario.css';

function AgregarUsuario({
  agregarUsuarioModal,
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
      .then((response) => {
        document.querySelector('#closeAgregarUsuario').click();
        setDataParent(false);
      })
      .catch((e) => alert(e));
    console.log(values);
  };

  const limpiarFormulario = () => {
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
          //setDataReceived(true)
        });
      });
    }
  }, [agregarUsuarioModal]);

  return (
    <div
      className={agregarUsuarioModal ? 'modal fade show' : 'modal fade'}
      id="modal-agregar-usuario"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="modal-agregar-usuario"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-body p-0">
            <div className="card card-plain">
              <div className="card-header text-left">
                <h3 className="font-weight-bolder">Agregar Usuario</h3>
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
        </div>
      </div>
    </div>
  );
}

export default AgregarUsuario;
