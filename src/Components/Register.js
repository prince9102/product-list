import React, { useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const navigate = useNavigate()

    let user = JSON.parse(localStorage.getItem('user'))
    useEffect(() => {
    if(localStorage.getItem('user')){
       user?.role =='Admin' ?  navigate('/main'): navigate('/usertable')
    }
    } , [])
    const initial = {
        name: '',
        email: '',
        role: '',
        password: '',
        cpassword: ''

    }

    const validation = yup.object({

        name: yup.string().required(),
        email: yup.string().required(),
        role: yup.string().required(),
        password: yup.string().required(),
        cpassword: yup.string().required(),

    })

    const submit = (value) => {


        axios.post('http://localhost:3002/register', value)
            .then((res) => {
                console.log(res.data)

                toast.success('Register Sucessfully !', {
                    position: toast.POSITION.TOP_CENTER
                })


            })
        navigate('/login')

    }
    return (
        <>
            <Formik

                initialValues={initial}
                validationSchema={validation}
                onSubmit={(value, { resetForm }) => {

                    submit(value)

                    resetForm({ value: '' })

                }}
            >
                <Form>

                    <div className='d-flex justify-content-center align-items-center w-100vw vh-100'>

                        <div className='w-50 bg-white border shadow'>
                            <div className='row'>
                                <div className='col-md-3'></div>
                                <div className='col-md-6'>
                                    <h3>Register Page </h3>

                                    <label htmlFor="">Name:</label>
                                    <Field type='text' name='name' className='form-control' />
                                    <ErrorMessage name='name' render={msg => <div className='text-danger'>{msg}</div>} />
                                    <label htmlFor="">Email:</label>
                                    <Field type='email' name='email' className='form-control' />
                                    <ErrorMessage name='email' render={msg => <div className='text-danger'>{msg}</div>} />
                                   
                                    <label htmlFor="">Role:</label>
                                    <Field as='select' name='role' className='form-control' options={"nameoption"} >
                                        <option value="" default >Select Role</option>
                                        <option value="Admin">Admin</option>
                                        <option value="User">User</option>
                                    </Field>
                                    <ErrorMessage name='role' render={msg => <div className='text-danger'>{msg}</div>} />



                                    <label htmlFor="">Password:</label>
                                    <Field type='text' name='password' className='form-control' />
                                    <ErrorMessage name='password' render={msg => <div className='text-danger'>{msg}</div>} />


                                    <label htmlFor="">Cpassword:</label>
                                    <Field type='text' name='cpassword' className='form-control' />
                                    <ErrorMessage name='cpassword' render={msg => <div className='text-danger'>{msg}</div>} />
                                    <button type='submit' className='btn btn-primary'>Submit</button>
                                </div>
                            </div>

                        </div>

                    </div>

                </Form>
            </Formik>
        </>
    )
}

export default Register