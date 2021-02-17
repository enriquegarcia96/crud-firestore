import React from 'react';
import {firebase } from './firebase';


function App() {

  const [tareas, setTareas]  = React.useState([]);
  const [tarea, setTarea] = React.useState('');
  const [modoEdicion, setModoEdicion] = React.useState(false);
  const [id, setId] = React.useState('');

  React.useEffect( () => {

    const obtenerDatos = async () =>{

      try {

        const db = firebase.firestore() //hago el llamado a firestore
        const data = await db.collection('tareas').get()//trae todos los documentos de tareas
        //console.log(data.docs);
        const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }));//para que pinte las tareas
        //console.log(arrayData)
        setTareas(arrayData); //lo  mando al array los datos de firestore

      } catch (error) {
        console.log(error);
      }
    }

    obtenerDatos();


  },[] )


  const agregar = async (e) =>{
    e.preventDefault();

    if (!tarea.trim()) {
      
      return
    }
    try { 
      const db = firebase.firestore();

      //objeto que guardara los datos a firestore
      const nuevaTarea = {
        name: tarea,
        fecha: Date.now()
      }

      const data = await db.collection('tareas').add(nuevaTarea);//lo guardo en fireStore

      setTareas([
        ...tareas, 
        {...nuevaTarea, id:data.id}
      ])

      setTarea('');
    } catch (error) {
      console.log(error);
    }    
  }

  const eliminar = async id =>{
    try {
      
      const db = firebase.firestore();
      await db.collection('tareas').doc(id).delete();

      //aliminar una tarea desde la base de datos de fireStore
      const arraFiltrado = tareas.filter(item => item.id !== id)
      setTareas(arraFiltrado)

    } catch (error) {
      console.log(error);
    }
  }

  const activarEdicion = ( item ) =>{
    setModoEdicion(true)
    setTarea(item.name)
    setId(item.id)
  }

  const editar = async (e) =>{
    e.preventDefault();

    if (!tarea.trim()) { 
      console.log('vacio')
      return
    }

    try {
      const db = firebase.firestore();
      await db.collection('tareas').doc(id).update({ 
        name: tarea
       })

       const arrayEditado = tareas.map( item => (
          item.id === id ? {id: item.id, fecha: item.fecha, name: tarea} : item
       ))

       // guardo los datos modificados
       setTareas(arrayEditado);

        setModoEdicion(false)
        setTarea('')
        setId('')

    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-6">
          <ul className="list-group">
            {
              tareas.map(item => (
                <li className="list-group-item" key={item.id}>
                  {item.name}
                  <button 
                    className="btn btn-danger btn-sm float-right"
                    onClick={ () => eliminar(item.id)}
                  >
                    Eliminar
                  </button>
                  <button 
                    className="btn btn-warning btn-sm float-right mr-2"
                    onClick={ () => activarEdicion(item)}
                  >
                    Editar
                  </button>
                </li>
              ))
            }
          </ul>
        </div>

        <div className="col-md-6">
          <h3>
            {
              modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'
            }
          </h3>
          <form onSubmit={ modoEdicion ? editar : agregar}>
            <input type="text"
            placeholder="ingrese tarea"
            className="form-control mb-2"
            onChange={e => setTarea(e.target.value)}
            value={tarea}
            />
            <button 
              className=
              {
                modoEdicion ? 'button btn btn-warning btn-block' : 'button btn btn-dark btn-block'
              }
              type="submit"
            >
                {
                  modoEdicion ? 'Editar' : 'Agregar'
                }
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default App;
