import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Formulario from '../components/Formulario';


const EditarCliente = () => {

  const [clienteEditado, setClienteEditado] = useState({});
  const [cargando, setcargando] = useState(true);
  const {id} = useParams()
  

  useEffect(() => {
    
    const obtenerClienteApi = async () => {
        try {
            const url = `http://localhost:4000/clientes/${id}`
            const respuesta = await fetch(url)        
            const resul = await respuesta.json()
            setClienteEditado(resul)
        } catch (error) {
            console.error(error)
        }
        setcargando(!cargando)          
    }
    obtenerClienteApi()
  }, []);



  return (
    <>
        <h1 className='font-black text-4xl text-blue-900'>Editar Cliente</h1>
        <p className='mt-3'>Modifique los siguientes campos para registrar un cliente</p>
        {clienteEditado?.nombre ? (
          <Formulario mensaje={'Editar Cliente'}
          cliente = {clienteEditado}
          cargando = {cargando}
            />

        ):(
            <p className='text-center block bg-gray-200'> Cliente no encontraddo</p>

        )}
    </>
  );
}

export default EditarCliente;
