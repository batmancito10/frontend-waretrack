import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FormUsuario from './FormUsuario';
import './FormularioUsuario.css';

function EditarUsuario({
  editarUsuarioModal,
  setDataParent,
  usuario,
  sedeRequest,
  sedes,
  setSedes,
  groups,
  setGroups,
  groupRequest,
  setEditarUsuarioModal,
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

  const editarUsuario = async () => {
    if (values['password'] === '') delete values['password'];
    if (values['sede'] === usuario['sede']) {
      values['sede'] = usuario['sede'].map((item) => item.id);
    }
    if (values['groups'] === usuario['groups']) {
      values['groups'] = usuario['groups'].map((item) => item.id);
    }

    const response = await fetch(
      `${import.meta.env.VITE_FUNCIONARIO}${usuario['id']}/`,
      {
        mode: 'cors',
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          ...values,

          salario: Number(values.salario),
          cargo: values.cargo === '' ? null : values.cargo,
        }),
      }
    );

    if (response.status !== 200) {
      throw new Error(' Error al realizar acción, intente nuevamente.');
    }

    return response;
  };

  const editUser = (e) => {
    e.preventDefault();
    editarUsuario()
      .then(() => {
        document.querySelector('#closeEditarUsuario').click();
        setDataParent(false);
      })
      .catch((e) => alert(e));
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
      groups: '',
      sede: '',
    });
    setEditarUsuarioModal(false);
  };

  useEffect(() => {
    if (sedes === '') {
      sedeRequest().then((data) => {
        setSedes(data);
        groupRequest().then((data) => {
          setGroups(data);
        });
      });
    }
    if (usuario !== null) {
      setValues({
        ...values,
        password: '',
        first_name: usuario['first_name'],
        last_name: usuario['last_name'],
        email: usuario['email'],
        salario: usuario['salario'] === null ? 0 : usuario['salario'],
        cargo: usuario['cargo'] === null ? '' : usuario['cargo'],
        groups: usuario['groups'],
        sede: usuario['sede'],
      });
      //.map(item => item.id)
    }
  }, [usuario]);

  return (
    <div className={editarUsuarioModal ? ' overlay modal_open' : 'overlay'}>
      <div className="container_card">
        <div className="modal-body p-0">
          <div className="card card-plain">
            <div className="card-header text-left">
              <h3 className="font-weight-bolder">Editar Usuario</h3>
            </div>
            <div className="card-body p-4 ">
              <FormUsuario
                values={values}
                inputHandler={inputHandler}
                sedes={sedes}
                dataReceived={dataReceived}
                id={'Editar'}
                onSubmit={editUser}
                groups={groups}
                setValues={setValues}
                setDataReceived={setDataReceived}
                editarUsuarioModal={editarUsuarioModal}
                setEditarUsuarioModal={setEditarUsuarioModal}
              />
            </div>
            <div className="card card-footer">
              <div className="d-flex justify-content-end gap-2">
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={() => {
                    limpiarFormulario();
                  }}
                >
                  Cancelar
                </button>
                <button
                  className="btn btn-primary"
                  type="submit"
                  form="EditarUsuario"
                >
                  Editar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditarUsuario;

EditarUsuario.propTypes = {
  editarUsuarioModal: PropTypes.bool,
  setDataParent: PropTypes.func,
  usuario: PropTypes.object,
  sedeRequest: PropTypes.func,
  sedes: PropTypes.array,
  setSedes: PropTypes.func,
  groups: PropTypes.array,
  setGroups: PropTypes.func,
  groupRequest: PropTypes.func,
  setEditarUsuarioModal: PropTypes.func,
};
