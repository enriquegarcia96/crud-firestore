import React from 'react';
import {firebase } from './firebase';


function App() {

  const [tareas, setTareas]  = React.useState([]);

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


  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-6">
          <ul className="list-group">
            {
              tareas.map(item => (
                <li className="list-group-item" key={item.id}>
                  {item.name}
                </li>
              ))
            }
          </ul>
        </div>

        <div className="col-md-6">
          Formulario
          <form action=""></form>
        </div>

      </div>
    </div>
  );
}

export default App;
