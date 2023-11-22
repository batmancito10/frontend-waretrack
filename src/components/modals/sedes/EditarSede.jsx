import { useContext, useEffect, useState } from 'react';
import { PageTitle } from '../../../App';
import Select from 'react-select';

const EditarSede = ({ id, inputBloqueado }) => {
  const [sede, setSede] = useState([]);
  const accessToken = localStorage.getItem('accessToken');
  const { setTitle } = useContext(PageTitle);
  const [dataReceived, setDataRecived] = useState(false);
  const [sedeList, setSedeList] = useState([]);

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

  useEffect(() => {
    setTitle('Perfil Sede');
    fetch(`${import.meta.env.VITE_SEDE}${id}/`, {
      mode: 'cors',
      method: 'get',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSede(data);
        const dataTransformed = data.sede.map((sede) => ({
          value: sede.id,
          label: sede.nombre,
        }));

        setSedeSelected(dataTransformed);
        setValues(dataTransformed.map((option) => option.value));
        setDataRecived(true);
      })
      .catch((error) => {
        console.error(
          'Hubo un error al obtener los datos del proveedor:',
          error
        );
      });
  }, [setTitle]);

  const [values, setValues] = useState([]);
  const handleChange = (selectedOption) => {
    setSedeSelected(selectedOption);
    setValues(selectedOption.map((option) => option.value));
  };

  const [nombre, setNombre] = useState(sede.nombre || '');
  const [direccion, setDireccion] = useState(sede.direccion || '');
  const [sedeSelected, setSedeSelected] = useState([]);

  useEffect(() => {
    setNombre(sede.nombre);
    setDireccion(sede.direccion);
    setSedeSelected(sedeSelected);
  }, [sede]);

  const handleChangeNombre = (e) => {
    console.log(e);
    const nuevoNombre = e.target.value;
    console.log(nuevoNombre);
    setNombre(nuevoNombre);
  };

  const handleChangeDireccion = (e) => {
    const nuevoDireccion = e.target.value;
    setDireccion(nuevoDireccion);
  };

  const editarProveedorRequest = async (e) => {
    e.preventDefault();

    const data = {
      nombre: nombre,
      direccion: direccion,
      sede: values,
      ciudad: sede.ciudad,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_SEDE}${id}/`, {
        mode: 'cors',
        method: 'put',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Actualización exitosa');
      } else {
        console.log('Error al actualizar');
      }
    } catch (error) {
      console.error('Hubo un error al hacer la solicitud', error);
    }
  };

  return (
    <>
      {' '}
      <div className="card card-body blur shadow-blur mx-4 mt-4 overflow-hidden">
        <div className="mt-4">
          <form
            role="form text-left"
            id="editarProveedor"
            onSubmit={editarProveedorRequest}
          >
            <div className="row mb-3">
              <div className="col-md-6">
                <div className="d-flex gap-2 align-items-center justify-content-between">
                  <label className="fs-6 pt-1">Nombres</label>
                  <input
                    className="form-control w-65"
                    type="text"
                    name="first-name"
                    value={nombre}
                    onChange={handleChangeNombre}
                    disabled={inputBloqueado}
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
                    disabled={inputBloqueado}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex gap-2 align-items-center justify-content-between">
                  <label className="fs-6 pt-1">Sede</label>
                  {dataReceived ? (
                    <Select
                      disabled={inputBloqueado}
                      name="sede"
                      options={sedeList.map((option) => ({
                        ...option,
                        isDisabled: inputBloqueado,
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
              {!inputBloqueado ? (
                <div className="card card-footer">
                  <div className="d-flex justify-content-end gap-2">
                    <button
                      className="btn btn-primary"
                      type="submit"
                      form="editarProveedor"
                    >
                      Editar
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditarSede;
