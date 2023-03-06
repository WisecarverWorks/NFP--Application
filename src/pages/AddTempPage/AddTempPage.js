import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

import useAuth from '../../hooks/useAuth';
import useCustomForm from '../../hooks/useCustomForm';
import axios from 'axios';


let initialValues = {
    temperature: '',
};

const AddTempPage = () => {
    const [user, token] = useAuth();
    const navigate = useNavigate();
    // customForm implementation
    const [formData, handleInputChange, handleSubmit] = useCustomForm(initialValues, postNewTemperature);



    async function postNewTemperature() {
        try {
            let response = await axios.post(
                "http://127.0.0.1:8000/api/temperatures/",
                formData,
                {
                    headers: {
                        Authorization:  "Bearer " + token,
        },
    }
    );
    navigate("/");
    console.log(response.data)
    console.log(user.id)
    } catch (error) {
        console.log(error.message);
    }
    }


    return (
        <div className='container'>
            <form className="form" onSubmit={handleSubmit}>
                <label>
                    DAILY TEMPERATURE{" "}
                    <input
                        id='tempInput'
                        type="number"
                        name="temperature"
                        value={formData.temperature}
                        onChange={handleInputChange}
                    />
                    </label>
                    <button type="submit">Set New Temp</button>
            </form>
        </div>
    );
};

export default AddTempPage;