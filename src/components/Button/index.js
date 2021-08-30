import './index.css';

const Button = ({ label, onClick, image = null, classess = '' }) => (
    <button className={`button ${image ? 'btn-image' : ''} ${classess}`} onClick={onClick}>
        {image ?
            <img src={image.src} alt={image.alt} />
            :
            <span>{label}</span>
        }</button>
)

export default Button;