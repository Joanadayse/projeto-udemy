import { useEffect, useState } from 'react';
import './admin.css';
import {auth , db} from "../../firebaseConnection";
import { signOut } from 'firebase/auth';
import { 
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  doc,
  deleteDoc,
  updateDoc

 } from 'firebase/firestore';

export default function Adimin(){
    const [tarefaInput , setTarefaInput]= useState('');
    const [user, setUser]= useState({});
    const[tarefas, setTarefas]=useState([]);
    const[edit,setEdit]=useState({});

    useEffect(()=>{
     async function loadingTarefa (){
      const userDetails= localStorage.getItem("@detailUser")
      setUser(JSON.parse(userDetails))

if(userDetails){
  const data= JSON.parse(userDetails)
  const taregaref= collection(db,"tarefas")
  const q = query(taregaref, orderBy("created","desc"),where("userUid", "==", data?.uid));
 onSnapshot(q , (snapshot)=>{
    let lista=[];
    snapshot.forEach((doc)=>{
lista.push({
  id:doc.id,
  tarefa:doc.data().tarefa,
  userUid:doc.data().userUid
})
    })
console.log(lista);
    setTarefas(lista);


  })
}

     }
        
      loadingTarefa();
    },[])

async function handRegister (e){
e.preventDefault();
if(tarefaInput === ""){
 alert('Digite sua tarefa...')
 return;
}

if(edit?.id){
handleUpdateTarefa();
return;
}

await addDoc(collection(db,"tarefas"),{
  tarefa: tarefaInput,
  created: new Date(),
  userUid: user?.uid

})

.then(()=>{
console.log("Tarefa resistrada");
setTarefaInput('');
})
.catch((error)=>{
console.logo("erro ao resgistrar"+ error)
})


}
 async function handLogount(params) {
await signOut(auth)
    
 }

 async function deleteTarefa(id) {
const docRef=doc(db, "tarefas",id)
await deleteDoc(docRef)
 }

 function editTarefa(item){
setTarefaInput(item.tarefa);
setEdit(item);
 }

 async function handleUpdateTarefa(params) {
  const docRef= doc(db, "tarefas", edit?.id)
  await updateDoc(docRef, {
    tarefa: tarefaInput
  })
  .then(()=>{
    console.log("tarefa atualizada")
    setTarefaInput("");
    setEdit({})
  })
  .catch(()=>{
    console.log("error ao atualizar")
     setTarefaInput("");
     setEdit({});
  })
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
          {Object.keys(edit).length > 0 ? (
            <button type="submit" className="btn-register" style={{backgroundColor: "#6add39"}}>
              ATUALIZAR TAREFA
            </button>
          ) : (
            <button type="submit" className="btn-register">
              REGISTRAR TAREFA
            </button>
          )}
        </form>
        {tarefas.map((item) => (
          <article key={item.id} className="list">
            <p>{item.tarefa}</p>

            <div>
              <button onClick={() => editTarefa(item)}>Editar</button>
              <button
                className="btn-delete"
                onClick={() => deleteTarefa(item.id)}
              >
                Concluir
              </button>
            </div>
          </article>
        ))}

        <button className="btn-logount" onClick={handLogount}>
          Sair
        </button>
      </div>
    );
}