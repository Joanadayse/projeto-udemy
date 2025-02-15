import { useState } from 'react';
import './admin.css';
import {auth} from "../../firebaseConnection";
import { signOut } from 'firebase/auth';

export default function Adimin(){
    const [tarefaInput , setTarefaInput]= useState('');

function handRegister (e){
e.preventDefault();
alert("clicou!")
}
 async function handLogount(params) {
await signOut(auth)
    
 }
    return (
      <div className="admin-container">
        <h1>Minhas tarefas</h1>
        <form className="form" onSubmit={handRegister}>
          <textarea
            value={tarefaInput}
            onChange={(e) => setTarefaInput(e.target.value)}
            placeholder="Digite a sua tarefa..."
          />
          <button type="submit" className="btn-register">
            REGISTRAR TAREFA
          </button>
        </form>
        <article className='list'>
          <p>Estudar javascript</p>

          <div>
            <button>Editar</button>
            <button className="btn-delete">Concluir</button>
          </div>
        </article>

        <button className="btn-logount" onClick={handLogount}>Sair</button>
      </div>
    );
}