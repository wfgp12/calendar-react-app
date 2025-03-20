
import { useForm } from '../../hooks'
import './LoginPage.css'

const loginFormFields = {
    loginEmail:"",
    loginPassword:"",
}

const registerFormFields = {
    registerName: "",
    registerEmail: "",
    registerPassword: "",
    registerPassword2: "",
}

export const LoginPage = () => {

    const {loginEmail, loginPassword, onInputChange: onLoginInputChange} = useForm( loginFormFields );
    const { registerEmail, registerPassword, registerPassword2, registerName, onInputChange: onRegisterInputChange } = useForm( registerFormFields );


    const onLoginSubmit = (e) => {
        e.preventDefault();
        console.log(loginEmail, loginPassword);
    }

    const onRegisterSubmit = (e) => {
        e.preventDefault();
        console.log(registerEmail, registerPassword, registerPassword2, registerName);
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={onLoginSubmit}>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name='loginEmail'
                                onChange={onLoginInputChange}
                                value={loginEmail}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='loginPassword'
                                onChange={onLoginInputChange}
                                value={loginPassword}
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={onRegisterSubmit}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name='registerName'
                                onChange={onRegisterInputChange}
                                value={registerName}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name='registerEmail'
                                onChange={onRegisterInputChange}
                                value={registerEmail}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='registerPassword'
                                onChange={onRegisterInputChange}
                                value={registerPassword}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name='registerPassword2'
                                onChange={onRegisterInputChange}
                                value={registerPassword2}
                            />
                        </div>

                        <div className="d-grid gap-2">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}