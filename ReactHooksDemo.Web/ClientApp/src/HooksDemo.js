import React, { useState, useEffect } from 'react';
import { produce } from 'immer';
import axios from 'axios';
import { format } from 'date-fns';

const HooksDemo = () => {

    const [count, setCount] = useState(0);
    const [formData, setFormData] = useState({ firstName: '', lastName: '', age: '' });
    const [weatherData, setWeatherData] = useState([]);

    const incrementCount = () => {
        setCount(count + 1);
    }

    useEffect(() => {

        const getWeatherData = async () => {
            const { data } = await axios.get('/weatherforecast');
            setWeatherData(data);
        }

        getWeatherData();
    }, []);

    const onTextChange = e => {

        const copy = { ...formData };
        copy[e.target.name] = e.target.value;
        setFormData(copy);

        // const nextState = produce(formData, draftState => {
        //     draftState[e.target.name] = e.target.value;
        // });

        // setFormData(nextState);
    }

    const onSubmitClick = () => {
        console.log(formData);
    }



    const { firstName, lastName, age } = formData;

    return (
        <div className="container">
            <h1>{count}</h1>
            <button onClick={incrementCount} className='btn btn-primary'>Increment</button>
            <div className="row">
                <div className="col-md-6 offset-md-3 card card-body bg-light">
                    <input type="text"
                        value={firstName}
                        onChange={onTextChange}
                        name="firstName"
                        className="form-control"
                        placeholder="First Name" />
                    <br />
                    <input
                        type="text"
                        value={lastName}
                        onChange={onTextChange}
                        name="lastName" className="form-control" placeholder="Last Name" />
                    <br />
                    <input
                        value={age}
                        onChange={onTextChange}
                        type="text" name="age" className="form-control" placeholder="Age" />
                    <br />
                    <button className='btn btn-primary' onClick={onSubmitClick}>Submit</button>
                    <h2>{firstName} - {lastName} - {age}</h2>
                </div>

                <div className="col-md-8 offset-md-2 card card-body bg-light mt-5">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>TemperatureC</th>
                                <th>TemperatureF</th>
                                <th>Summary</th>
                            </tr>
                        </thead>
                        <tbody>
                            {weatherData.map((d, i) => <tr key={i}>
                                <td>{
                                format(new Date(d.date), 'cccc MMMM Lo, yyyy')}</td>
                                <td>{d.temperatureC}</td>
                                <td>{d.temperatureF}</td>
                                <td>{d.summary}</td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default HooksDemo;