import React, { useEffect } from 'react';
import { Formik , Form , Field , ErrorMessage } from 'formik';
import * as yup from 'yup'
import axios from 'axios';
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom';

const Login = () => {
const navigate= useNavigate()
let user = JSON.parse(localStorage.getItem('user'))
useEffect(() => {
if(localStorage.getItem('user')){
   user?.role =='Admin' ?  navigate('/main'): navigate('/usertable')
}
} , [])
    const initial = {
        email:'',
        password:'',
        role:''
    }

    const validation = yup.object({
        email: yup.string().email().required(),
        password:yup.string().required(),
        role:yup.string().required()
    })

const submit = (data)=>{
    axios.get('http://localhost:3002/register')
    .then((res)=>{
        const details = res.data.filter((item)=>(
            item.email == data.email && item.password == data.password && item.role == data.role
        ))

        
        console.log(data)
        
        if(details.length>0){
            const info = details[0]

            localStorage.setItem('user'  , JSON.stringify(info))

            toast.success('Login Sucessfully !' ,{
                position:toast .POSITION.TOP_CENTER
            })
            navigate('/main')
        }
else{
    toast.error('Invalid Credential !' ,{
        position:toast .POSITION.TOP_CENTER
    })

    navigate('/login')
}
   


    })

   
}

  return (
  <>
  <Formik

  initialValues={initial}
  validationSchema={validation}
  onSubmit={(value , {resetForm})=>{
    submit(value)
    resetForm({value:''})
  }}
  >

  <Form>

  <div  className='d-flex justify-content-center align-items-center w-100vw vh-100'>

<div className='w-50 bg-white border shadow'>
<div className='row'>
    <div className='col-md-3'></div>
    <div className='col-md-6'>
    <h3>Login Page </h3>
  <label htmlFor="">Email:</label>
        
            <Field type='text' name='email' className='form-control' />
            <ErrorMessage name='email' render={msg=><div className='text-danger'>{msg}</div>}/>
            <label htmlFor="">Password:</label>
            <Field type='text' name='password' className='form-control' />
            <ErrorMessage name='password' render={msg=><div className='text-danger'>{msg}</div>}/>

            <label htmlFor="">Role:</label>
            <Field as='select' name='role' className='form-control' options={"nameoption"} >
            <option value="" default >Select Role</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
            </Field>
                <ErrorMessage name='role' render={msg=><div className='text-danger'>{msg}</div>}/>
            <button type='submit' className='btn btn-primary m-3'>Submit</button>
            </div>
    </div>

    </div>

    </div>
  </Form>
  </Formik>

  </>
  )
}

export default Login