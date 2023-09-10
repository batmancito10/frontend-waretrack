import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Login () {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');

    const navigate = useNavigate();

    //console.log();

    const makeRequest = async () => {
        const response = await fetch(import.meta.env.VITE_TOKEN, {
            mode: 'cors',
            method: 'post',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                username: user,
                password: pass
            })
        });
        if(response.status !== 200){
            const error = response.status === 401 ? ' Nombre de usuario o contraseña incorrectos, intente nuevamente.' : ' Hubo un error, intente nuevamente.'
            throw new Error(error);
        }
        return await response.json();
    }
    
    const onSubmit = async (e) => {
        e.preventDefault();
        makeRequest().then((response) => {
            localStorage.setItem('accessToken', response.access);
            localStorage.setItem('refreshToken', response.refresh);
            localStorage.setItem('userInfo', JSON.stringify(response.user));
            navigate('/')
        }
        ).catch((err) => {
            alert(err);
        });
        
    }

    return <>
    <div className="container position-sticky z-index-sticky top-0">
        <div className="row">
        <div className="col-12">
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg blur blur-rounded top-0 z-index-3 shadow position-absolute my-3 py-2 start-0 end-0 mx-4">
            <div className="container-fluid pe-0 text-center d-flex justify-content-center">
                <span className="navbar-brand font-weight-bolder fs-3">
                Waretrack
                </span>
            </div>
            </nav>
            {/* End Navbar */}
        </div>
        </div>
    </div>
    <main className="main-content  mt-0">
        <section>
        <div className="page-header min-vh-75">
            <div className="container">
            <div className="row">
                <div className="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto">
                <div className="card card-plain mt-8">
                    <div className="card-header pb-0 text-left bg-transparent">
                    <h3 className="font-weight-bolder text-info text-gradient">
                        Bienvenido
                    </h3>
                    <p className="mb-0">Ingresa tu usuario y tu contraseña</p>
                    </div>
                    <div className="card-body">
                    <form role="form" onSubmit={onSubmit}>
                        <label htmlFor='username'>Usuario</label>
                        <div className="mb-3">
                        <input
                            name='username'
                            id='username'
                            type="text"
                            autoComplete='true'
                            className="form-control"
                            placeholder="Usuario"
                            aria-label="Email"
                            aria-describedby="email-addon"
                            maxLength={20}
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                            required
                        />
                        </div>
                        <label htmlFor='password'>Contraseña</label>
                        <div className="mb-3">
                        <input
                            name='password'
                            id='password'
                            type="password"
                            className="form-control"
                            placeholder="Contraseña"
                            aria-label="Password"
                            aria-describedby="password-addon"
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            required
                        />
                        </div>
                        <div className="form-check form-switch">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="rememberMe"
                            defaultChecked="true"
                        />
                        <label className="form-check-label" htmlFor="rememberMe">
                            Recuérdame
                        </label>
                        </div>
                        <div className="text-center">
                        <button
                            type="submit"
                            className="btn bg-gradient-info w-100 mt-4 mb-0"
                        >
                            Ingresar
                        </button>
                        {/* <Link to="/" className='btn bg-gradient-info w-100 mt-4 mb-0'>Ingresar</Link> */}
                        </div>
                    </form>
                    </div>
                </div>
                </div>
                <div className="col-md-6">
                <div className="oblique position-absolute top-0 h-100 d-md-block d-none me-n8">
                    <div
                    className="oblique-image bg-cover position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6"
                    style={{
                        backgroundImage:
                        'url("/src/assets/img/curved-images/curved-6.jpg")'
                    }}
                    />
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
    </main>
    {/* -------- START FOOTER 3 w/ COMPANY DESCRIPTION WITH LINKS & SOCIAL ICONS & COPYRIGHT ------- */}
    <footer className="footer py-5">
        <div className="row">
        <div className="col-8 mx-auto text-center mt-1">
            <p className="mb-0 text-secondary">Copyright © Waretrack.</p>
        </div>
        </div>
    </footer>
    </>
}

export default Login;