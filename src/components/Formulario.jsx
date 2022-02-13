import React, {  useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import Alerta from './Alerta'
import Spinner from './Spinner'

const Formulario = ({mensaje, cliente, cargando} ) => {

  
  

  const  navigate = useNavigate()

  const nuevoClienteSchema = yup.object().shape({
    nombre: yup.string()
                .min(3,'El nombre es muy corto')
                .max(30,'El nombre es muy largo')
                .required('El nombre del cliente es obligatorio'),
    empresa:yup.string()
                .required('El nombre de la empresa es requerida'),
    email:yup.string()
                .email('Email no valido')
                .required('El correo es requerido'),
    telefono:yup
                .number('Numero no es valido')
                .integer('Numero no es valido')
                .positive('Numero no es valido')
                .typeError('Numero no es valido')
                ,
  })

  const handleSubmit = async (values) => {
      try {
        let respuesta 
         if(cliente?.id) {
          const url = `http://localhost:4000/clientes/${cliente.id}`
           respuesta = await fetch(url, {
                      method:'PUT',
                      body: JSON.stringify(values),
                      headers: {
                              'Content-Type': 'application/json'
                                }
                  })
         } else {
          const url = 'http://localhost:4000/clientes'
           respuesta = await fetch(url, {
              method:'POST',
              body: JSON.stringify(values),
              headers: {
                      'Content-Type': 'application/json'
                        }
          })

        
         }
         await respuesta.json()
         navigate('/clientes')
      } catch (error) {
        console.log(error)  
      }
  }  
  return (
    cargando ? <Spinner />:
    (<div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
      <h1 className='text-gray-600 font-bold text-xl'>{mensaje}</h1>
      <Formik initialValues={{nombre: cliente?.nombre ?? "",
                                empresa: cliente?.empresa ?? "",
                                email: cliente?.email ?? '',
                                telefono: cliente?.telefono  ?? '',
                                notas: cliente?.notas  ?? '',
                              }}
               onSubmit= { async (values, {resetForm})=> { await handleSubmit(values) 
                            resetForm()}}    
               validationSchema= {nuevoClienteSchema}      
               enableReinitialize={true}   
          >
          { ({errors, touched})=>{

              //console.log(data)
              return (
          <Form className='mt-10'>
              <div className='mb-4'>
                  <label htmlFor="nombre"
                  className='text-gray-800'>Nombre:</label>
                  <Field type='text' id='nombre'
                  placeholder='Nombre del cliente'
                  className='mt-2 block w-full p-3 bg-gray-50'
                  name='nombre'/>
                  {errors.nombre && touched.nombre?
                   <Alerta>{errors.nombre}</Alerta>
                    :''
                    }
                  {/* <ErrorMessage name='nombre'/> */}
              </div>
              <div className='mb-4'>
                  <label htmlFor="empresa"
                  className='text-gray-800'>Empresa:</label>
                  <Field type='text' id='empresa'
                  placeholder='Empresa del cliente'
                  className='mt-2 block w-full p-3 bg-gray-50'
                  name='empresa'/>
                    {errors.empresa && touched.empresa?
                   <Alerta>{errors.empresa}</Alerta>
                    :''
                    }
              </div>
              <div className='mb-4'>
                  <label htmlFor="email"
                  className='text-gray-800'>Email:</label>
                  <Field type='email' id='email'
                  placeholder='Email del cliente'
                  className='mt-2 block w-full p-3 bg-gray-50'
                  name='email'/>
                    {errors.email && touched.email?
                   <Alerta>{errors.email}</Alerta>
                    :''
                    }
              </div>
              <div className='mb-4'>
                  <label htmlFor="telefono"
                  className='text-gray-800'>Telefono:</label>
                  <Field type='tel' id='telefono'
                  placeholder='Telefono del cliente'
                  className='mt-2 block w-full p-3 bg-gray-50'
                  name='telefono'/>
                    {errors.telefono && touched.telefono?
                   <Alerta>{errors.telefono}</Alerta>
                    :''
                    }
              </div>
              <div className='mb-4'>
                  <label htmlFor="notas"
                  className='text-gray-800'>Notas:</label>
                  <Field as='textarea' type='text' id='notas'
                  placeholder='Notas del cliente'
                  className='mt-2 block w-full p-3 bg-gray-50 h-40'
                  name='notas'/>
              </div>
             <input type="submit"value={mensaje}
                  className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg' />
          </Form>
          )}}
      </Formik>
    </div>)
  );
}

Formulario.defaulProps = {
  cliente : {},
  cargando :false
}

export default Formulario;
