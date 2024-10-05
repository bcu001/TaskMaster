import { useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar'
import Seperator from './components/Seperator';
import Delete from './components/Delete';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [isEdit, setIsEdit] = useState({ editing: false });
  const [isLoaded, setIsLoaded] = useState(false);
  const [showFinishedTask, setShowFinishTask] = useState(false);
  const [showDeleteWindow, setShowDeleteWindow] = useState(false);
  const [deleteId, setDeleteId] = useState('');

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
    if (task.trim().length > 3) {
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

  const handlerDelete = () => {
    const newTaskList = taskList.filter(t => t.id !== deleteId);
    setTaskList(newTaskList);
    setShowDeleteWindow(false);
    setDeleteId('');
  }

  const HandlerShowDelete = (id) => {
    setDeleteId(id);
    setShowDeleteWindow(true);
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
      <div id='main-taskmaster' className={`todo-main container mx-auto my-6 rounded-xl p-5 min-h-[85vh] relative `}>
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

        <Seperator s_gap={4} s_color={'black'} />

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
                  <button onClick={() => { HandlerShowDelete(t.id) }} className='bg-red-600 py-1 px-3 rounded-lg active:bg-red-700 text-white font-bold'><img src="/trash.svg" alt="delete" width={25} /></button>

                  {
                    showDeleteWindow && <div className={`absolute top-0 right-0  w-full h-full flex justify-center items-center `}>
                      <div className=" bg-white w-60 flex flex-col rounded-xl overflow-hidden ">
                        <div className='cursor-default font-bold p-2 bg-gray-300 text-black'>Delete Task?</div>
                        <div className='cursor-default text-gray-500 border border-gray-500 border-x-white p-2'>This can't be undone</div>
                        <div className=" btns flex gap-4 justify-end p-2">
                          <button onClick={() => { setShowDeleteWindow(false) }} className='border p-1 border-black rounded-lg active:bg-slate-200 text-black'>Cancel</button>
                          <button onClick={() => { handlerDelete() }} className='border p-1 border-black rounded-lg bg-red-600 text-white active:bg-red-700'>Delete</button>
                        </div>
                      </div>
                    </div>
                  }
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
