import { useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [isEdit, setIsEdit] = useState({ editing: false });
  const [isLoaded, setIsLoaded] = useState(false);
  const [showFinishedTask, setShowFinishTask] = useState(false);

  const showData = () => {
    console.log(taskList);
  }

  useEffect(() => {
    let saveTaskList = localStorage.getItem('taskList');
    if (saveTaskList) {
      let jsonSaveTaskList = JSON.parse(saveTaskList);
      setTaskList(jsonSaveTaskList);
    }
    setIsLoaded(true);
  }, [])

  useEffect(() => {
    if (isLoaded) { saveTaskList(); }
  }, [taskList, isLoaded])

  const saveTaskList = () => {
    localStorage.setItem('taskList', JSON.stringify(taskList));
  }

  const toogleFinishedTasks = () => {
    setShowFinishTask(!showFinishedTask);
  }

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
      isEdit.editing ? handlerSave() : handlerAdd();
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

  const handlerEdit = (e, id) => {
    setIsEdit(prevIsEdit => {
      const newIsEdit = { editing: !prevIsEdit.editing, id: id };
      if (newIsEdit.editing) {
        const index = taskList.findIndex((t) => {
          return (t.id === id);
        })
        setTask(taskList[index].task);
      }
      else {
        setTask('');
      }
      return newIsEdit;
    });
  }

  const handlerSave = () => {
    const index = taskList.findIndex(t => {
      return (t.id === isEdit.id);
    })
    let newTaskList = [...taskList];
    newTaskList[index].task = task;
    setTaskList(newTaskList);
    setIsEdit({ editing: false });
    setTask('');
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

  const handlerResetInput = () => {
    let a = document.getElementById('e');
    textarea.style.height = 'auto';
    textarea.value = '';
  }

  const handlerInput = () => {
    let a = document.getElementById('e'); a.style.height = 'auto';
    a.style.height = a.scrollHeight + 'px';
  }

  return (
    <>
      <Navbar showData={showData} />
      <div id='main-taskmaster' className="todo-main container mx-auto my-6 rounded-xl p-5 min-h-[85vh]">
        <h1 className='font-bold text-xl text-center'>TaskMaster - Your Tasks</h1>
        <div className="addTask">
          <h2 className='my-2 font-bold text-xl'>Add your Task</h2>
          <div className='flex gap-4'>
            <input className='outline-none rounded-lg p-1 w-11/12' name='task' type="text" onChange={handerChange} onKeyDown={handlerKeyDown} value={task} placeholder='Enter your task' />
            {/* <textarea id='e' className='outline-none w-11/12 p-1 text-base leading-relaxed border border-gray-300 rounded-md resize-none overflow-hidden box-border max-h-52' onInput={handlerInput} name='task' type="text" onChange={handerChange} onKeyDown={handlerKeyDown} value={task} rows="1" placeholder="Type your task..." ></textarea> */}
            <button disabled={task.length <= 3} onClick={handlerSave} className={`bg-green-600 h-full py-1 px-3 rounded-lg active:bg-green-700 text-white font-bold ${isEdit.editing ? '' : 'hidden'} disabled:bg-slate-500 transition-all`}>Save</button>
            <button disabled={task.length <= 3} onClick={handlerAdd} className={`bg-green-600 h-full py-1 px-3 rounded-lg active:bg-green-700 text-white font-bold  ${isEdit.editing ? 'hidden' : ''} disabled:bg-slate-500 transition-all duration-300`}>Add</button>
          </div>
          <div className='flex gap-2 mt-2'>
            <input onChange={toogleFinishedTasks} type="checkbox" checked={showFinishedTask} id='showFinish' />
            <label htmlFor="showFinish">Show Finished Tasks</label>
          </div>
        </div>

        {/* Seperator */}
        <div className='border my-4 border-black'></div>

        <div className="yourTasks">
          <h2 className='font-bold text-xl'>Your Tasks</h2>

          {taskList.length === 0 && <div className='m-5 text-red-600 text-xl text-center' >No tasks</div>}

          {taskList.map((t) => {
            return (showFinishedTask || !t.isDone) && (
              <div key={t.id} className='flex justify-between mb-5 '>
                <div className='flex gap-2 w-10/12 items-center'>
                  <input type="checkbox" id={t.id} onChange={handlerCheckbox} checked={t.isDone} />
                  <div className={`${t.isDone ? 'line-through' : ''}`}>{t.task}</div>
                </div>
                <div className="buttons flex gap-2 h-full">
                  <button onClick={(e) => { handlerEdit(e, t.id) }} className='bg-green-600 py-1 px-3 rounded-lg active:bg-green-700 text-white font-bold'><img src="/edit.svg" alt="edit" width={25} /></button>
                  <button onClick={() => { handlerDelete(t.id) }} className='bg-red-600 py-1 px-3 rounded-lg active:bg-red-700 text-white font-bold'><img src="/trash.svg" alt="delete" width={25} /></button>
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
