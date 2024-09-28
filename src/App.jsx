import { useRef, useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);

  const handlerAdd = () => {
    if (task != '') {
      setTaskList([...taskList, { id: uuidv4(), task: task, isDone: false }])
      setTask('')
    }
  }
  const handerChange = (e) => {
    setTask(e.target.value)
  }
  const handlerKeyDown = (e) => {
    if (e.key == 'Enter') {
      handlerAdd();
    }
  }

  const handlerCheckbox = (e) => {
    const id = e.target.id;
    const index = taskList.findIndex(t => {
      return (t.id === id);
    })
    let newTaskList = [...taskList];
    newTaskList[index].isDone = !(newTaskList[index].isDone);
    setTaskList(newTaskList);
  }


  const handlerEdit = () => {
    console.log("Edited");

  }
  const handlerDelete = (id) => {
    const isDelete = confirm("Are you sure you want to delete this");
    if (isDelete) {
      const newTaskList = taskList.filter(t => {
        return (t.id != id);
      })
      setTaskList(newTaskList);
    }
  }

  return (
    <>
      <Navbar />
      <div id='main-taskmaster' className="todo-main container mx-auto my-6 rounded-xl p-5 min-h-[85vh]">
        <h1 className='font-bold text-xl text-center'>TaskMaster - Manage you todos at one place</h1>
        <div className="addTask">
          <h2 className='my-2 font-bold text-xl'>Add your Task</h2>
          <div className='flex gap-4'>
            <input className='outline-none rounded-lg p-1 w-11/12' type="text" onChange={handerChange} onKeyDown={handlerKeyDown} value={task} placeholder='Enter your task' />
            <button onClick={handlerAdd} className='bg-green-600 py-1 px-3 rounded-lg active:bg-green-700 text-white font-bold'>Add</button>
          </div>
        </div>

        {/* Seperator */}
        <div className='border my-4 border-black'></div>

        <div className="yourTasks">
          <h2 className='font-bold text-xl'>Your Tasks</h2>


          {taskList.map((t) => {
            return (
              <div key={t.id} className='flex justify-between items-center my-4'>
                <div className='text flex gap-2'>
                  <input type="checkbox" id={t.id} onChange={handlerCheckbox} />
                  <span className={t.isDone ? 'line-through' : ''}>{t.task}</span>
                </div>
                <div className="buttons flex gap-2">
                  <button onClick={handlerEdit} className='bg-green-600 py-1 px-3 rounded-lg active:bg-green-700 text-white font-bold'>Edit</button>
                  <button onClick={() => { handlerDelete(t.id) }} className='bg-green-600 py-1 px-3 rounded-lg active:bg-green-700 text-white font-bold'>Delete</button>
                </div>
              </div>
            )
          })}


        </div>
      </div>
    </>
  )
}

export default App
