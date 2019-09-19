import React, { useEffect, useState } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

// STEP 1
    // RETURN FORM (SEE DETAILS BELOW)


const UserForm = ({ values, errors, touched, status }) => {
    const [user, setUser] = useState([]);
    useEffect(() => {
        if (status) {
            setUser([...user, status]);
        }
    }, [status]);

    return(
        <div className='userform'>
            FORM
            {/* A) IMPORT FORM AND FIELD FROM FORMIK AND CREATE FORM WITH 1 FIELD AS A TEST */}
            <Form>
                <label className='textContainer'>
                    <Field 
                    type='text' 
                    name='name'
                    placeholder='Name'
                    />
                    {touched.name && errors.name && 
                        <p className='error'>{errors.name}</p>
                    }
                    <Field 
                    type='text' 
                    name='email'
                    placeholder='Email'
                    />
                    {touched.email && errors.email && 
                        <p className='error'>{errors.email}</p>
                    }
                    <Field 
                    type='text' 
                    name='number'
                    placeholder='Phone Number'
                    />
                    <Field 
                    type='password' 
                    name='password'
                    placeholder='Password'
                    />
                    {touched.password && errors.password && 
                        <p className='error'>{errors.password}</p>
                    }
                </label>
                <label className='checkboxContainer'>
                    <Field
                    type='checkbox'
                    name='tos'
                    checked={values.tos}
                    />
                    Do you agree to the Terms of Service?
                    {touched.tos && errors.tos && 
                        <p className='error'>{errors.tos}</p>
                    }
                </label>
                <label className='contact'>
                    <Field 
                    component='select'
                    name='contact'>
                        <option value='' disabled>Contact preference</option>
                        <option value='Phone'>Phone</option>
                        <option value='Email'>Email</option>
                    </Field>
                    {touched.contact && errors.contact && 
                        <p className='error'>{errors.contact}</p>
                    }
                {
                    values.contact === 'Phone' ? 
                        <div>
                            <Field 
                            component='select'
                            name='phonepref'>
                            <option value='' disabled>Phone contact type</option>
                            <option value='phone'>Call</option>
                            <option value='email'>Text</option>
                            </Field> 
                        </div>    
                        : null
                        
                }
                </label>
                <button type='submit'>Submit</button>
            </Form>
            {user.map(user => (
                <ul key={user.id}>
                    <li>ID Number: {user.id}</li>
                    <li>Name: {user.name}</li>
                    <li>Email: {user.email}</li>
                    <li>Phone Number: {user.number}</li>
                    <li>Password: Hidden</li>
                    <li>Terms of Service: Agreed</li>
                    <li>Contact: {user.contact}</li>
                </ul>
            ))
            }
        </div>
    )
}
// B) ADD FORMIKUSERFORM FUNCTION AND USE WITHFORMIK IMPORTED FROM FORMIK TO CREATE FORM USING FORMIK
const FormikUserForm = withFormik({
    mapPropsToValues({name, email, number, password, tos, contact, phonepref}
    ) {
        return {
            name: name || '',
            email: email || '',
            number: number || '',
            password: password || '',
            tos: tos || false,
            contact: contact || '',
            phonepref: phonepref || ''
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
        tos: Yup.bool()
            .test(
                'concent',
                'You have to agree to the Terms of Service before you continue',
                value => value === true
            )
            .required(
                'You have to agree to the Terms of Service before you continue.'
            ),
        contact: Yup.string().required('Contact preference is required'),
        // phonepref: Yup.string().required('required')
    }),
    handleSubmit(values, { setStatus }){
        axios
        .post('https://reqres.in/api/users/', values)
        .then(response => {
            setStatus(response.data);
        })
        .catch(error => console.log('Error', error.response));
        console.log('sent')
    }






// C) ADD FORM *****
})(UserForm);

export default FormikUserForm;