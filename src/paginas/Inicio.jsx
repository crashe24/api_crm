import {useState,useEffect} from 'react';
import Cliente from '../components/Cliente';

const Inicio = () => {

  const [clientes, setclientes] = useState([]);
  useEffect(() => {
    const obtenerClientesApi = async() => {
      try {
         const url = 'http://localhost:4000/clientes'
         const respuesta = await fetch(url)
         const result = await respuesta.json()
        setclientes(result)
       
      } catch (error) {
        console.log(error)
      }
    }
    obtenerClientesApi()
  }, []);

  const handleEliminar = async id => {
    const confirmar = confirm('Desear eliminar este cliente');
    if (confirmar) {
        try {
          const url = `http://localhost:4000/clientes/${id}`
          const respuesta = await fetch(url, {
            method: 'DELETE'
          })
          await respuesta.json()
          // refrescar la pagina
          // esto no se debe hacer
          //location.reload() mejor es actualizar el state
          const arrayClientes = clientes.filter(c => (c.id !== id))
          setclientes(arrayClientes)
        } catch (error) {
          console.log(error)
        }
    }
  }

  return (
   
       <>
      <h1 className='font-black text-4xl text-blue-900'>Lista de Clientes</h1>
      <p className='mt-3'>Administra tus clientes</p>
      <table className='w-full mt-5 table-auto shadow bg-white'>
        <thead className='bg-blue-800 text-white'>
          <tr>
            <th className='p-2'>Nombre</th>
            <th className='p-2'>Contacto</th>
            <th className='p-2'>Empresa</th>
            <th className='p-2'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          { clientes.map( cli => (<Cliente key= {cli.id} cliente= {cli} handleEliminar={handleEliminar}/>))}
        </tbody>
      </table>
      
    </>
   
  );
}

export default Inicio;
