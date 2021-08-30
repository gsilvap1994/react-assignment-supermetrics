import './index.css';
import Button from "../Button";


const LoginForm = ({
    form,
    name,
    setName,
    email,
    setEmail,
    onSubmitForm,
    error
}) => (
    <div className="card">
        <header>
            <h1>LOGIN</h1>
        </header>
        <form onSubmit={onSubmitForm} ref={form}>
            <div className="field name">
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {
                    error && error.name &&
                    <span className="error">Please fill with a valid name</span>
                }
            </div>
            <div className="field email">
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {
                    error && error.email &&
                    <span className="error">Please fill with a valid email</span>
                }
            </div>
            <div className="field submit-button">
                <Button label="GO" onClick={onSubmitForm} />
            </div>
        </form>
    </div>
)

export default LoginForm;