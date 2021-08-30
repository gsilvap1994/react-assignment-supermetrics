import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import LoginForm from "../../components/LoginForm";
import { useAuth } from "../../contexts/auth.context";
import './index.css';

const Login = () => {
    const { doLogin } = useAuth();
    const history = useHistory();

    const form = useRef();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState({ email: false, name: false, })

    async function login(event) {
        event.preventDefault();
        const response = await doLogin({
            name: name,
            email: email
        })

        if (response && response.sl_token) {
            return history.push('/posts');
        }
        setError(response)
    }

    return (
        <main className="login-page">
            <LoginForm
                form={form}
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                error={error}

                onSubmitForm={($event) => login($event)}
            />
        </main>
    )
}
export default Login;