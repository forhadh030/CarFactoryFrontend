import './CarList.css';

const Car = (props) => {
    const {id, make, model, color, registrationNumber, price, year} = props.data;

    return (
        <div>
            <td>{id}</td>
            <td>{make}</td>
            <td>{model}</td>
            <td>{color}</td>
            <td>{registrationNumber}</td>
            <td>{price}</td>
            <td>{year}</td>
        </div>
    );
}

export default Car