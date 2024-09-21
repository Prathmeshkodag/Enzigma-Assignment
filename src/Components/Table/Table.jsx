import React, { useState } from 'react';
import '../Assets/Table.css'; 

import Modal from 'react-bootstrap/Modal';
import Toaster from '../TOasterMassage/Toaster';

const Table = () => {

    //   below states relate to table
    const [tasks, setTasks] = useState([
        { id: 1, assignedTo: 'User 1', status: 'Completed', dueDate: '2024-09-02', priority: 'Low', comments: 'This task is good' },
        { id: 2, assignedTo: 'User 2', status: 'In Progress', dueDate: '2024-09-14', priority: 'High', comments: 'This' },
        { id: 3, assignedTo: 'User 3', status: 'Not Started', dueDate: '2024-08-18', priority: 'Low', comments: 'This' },
        { id: 4, assignedTo: 'User 4', status: 'In Progress', dueDate: '2024-06-12', priority: 'Normal', comments: 'This task is good' }
    ]);

    const [newTask, setNewTask] = useState({ assignedTo: '', status: '', dueDate: '', priority: '', comments: '' });
    const [editMode, setEditMode] = useState(false); 
    const [editTaskId, setEditTaskId] = useState(null); 
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 5;
    const [filederror, setFilederror] = useState('');
    const [newtaskadd, setnewtaskadd] = useState(false);
    const[taskdelete, settaskdelete] = useState(false);
    const [edittask, setedittask] = useState(false);

    //   below states relate to edit or add modal pop up
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    // Add new task
    const handleAddTask = () => {
       
        const newTaskId = tasks.length + 1;
        const newTaskObj = { id: newTaskId, ...newTask };
        if(newTask.assignedTo === '' ||newTask.status === '' || newTask.dueDate === '' || newTask.priority === '' || newTask.comments === ''){
            setFilederror("Please fill all the fields");
        }else{
            setnewtaskadd(true);
            setTimeout(()=>{
                setTasks([...tasks, newTaskObj]);
                setNewTask({ assignedTo: '', status: '', dueDate: '', priority: '', comments: '' });
                handleClose();
                setnewtaskadd(false);
            },1500)
        
        }

        
        
    };

    // Edit task
    const handleEditTask = (id) => {
        setedittask(false)
        const taskToEdit = tasks.find(task => task.id === id);
        setNewTask({
            assignedTo: taskToEdit.assignedTo,
            status: taskToEdit.status,
            dueDate: taskToEdit.dueDate,
            priority: taskToEdit.priority,
            comments: taskToEdit.comments
        });
        setEditMode(true);
        setEditTaskId(id);
    };

    // Save edited task
    const handleSaveTask = () => {
       

        if(newTask.assignedTo === '' ||newTask.status === '' || newTask.dueDate === '' || newTask.priority === '' || newTask.comments === ''){
            setFilederror("Please fill all the fields");
        }else{
            setedittask(true);

        setTimeout(()=>{
            setTasks(tasks.map(task =>
                task.id === editTaskId ? { id: editTaskId, ...newTask } : task
            ));
            setNewTask({ assignedTo: '', status: '', dueDate: '', priority: '', comments: '' });
            setEditMode(false);
            setEditTaskId(null);
            handleClose();
        },1500)
    }
       
    };

    // Delete task
    const handleDeleteTask = (id) => {
        settaskdelete(true);
        setTimeout(()=>{
            setTasks(tasks.filter(task => task.id !== id));
            settaskdelete(false);
        },1500)
        
    };

    // Search function
    const filteredTasks = tasks.filter(task =>
        task.assignedTo.toLowerCase().includes(search.toLowerCase()) ||
        task.status.toLowerCase().includes(search.toLowerCase()) ||
        task.priority.toLowerCase().includes(search.toLowerCase())
    );

    
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

   

    return (
        <>
            <div style={{position: 'relative',width:"100vw",padding:"10px"}}>
                

                <div className="table-actions">
                    <button className="new-task" onClick={() => {  handleShow() }} disabled={editMode}>
                        {editMode ? 'Editing Task' : 'New Task'}
                    </button>
                    <button className="refresh" onClick={() => window.location.reload()}>Refresh</button>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{width:'30%'}}
                    />
                </div>

                <table className="task-table">
                    <thead>
                        <tr>
                            <th>Assigned To</th>
                            <th>Status</th>
                            <th>Due Date</th>
                            <th>Priority</th>
                            <th>Comments</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTasks.map((task) => (
                            <tr key={task.id}>
                                <td>{task.assignedTo}</td>
                                <td>{task.status}</td>
                                <td>{task.dueDate}</td>
                                <td>{task.priority}</td>
                                <td>{task.comments}</td>
                                <td>
                                    <button className="edit-btn" onClick={() => {handleEditTask(task.id); handleShow()}}>Edit</button>
                                    <button className="delete-btn" onClick={() => handleDeleteTask(task.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

               
                

                
            </div>

            <Modal show={show} onHide={handleClose} style={{ top: '0%', padding: '20px', position: 'absolute' }}>
                <Modal.Header  >
                    <Modal.Title >{editMode ? 'Edit Task' : 'Add New Task'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div class="mb-3 p-3 d-flex justify-content-between align-items-center w-100">
                    <div class='d-flex flex-column w-45'>
                    <label for="exampleFormControlInput1" class="form-label">Assigned To <span class='text-danger'>*</span></label>
                    <input
                        type="text"
                        placeholder="Assigned To"
                        value={newTask.assignedTo}
                        onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                        class="form-control" id="exampleFormControlInput1"
                    />
                    <small class='text-danger'>{newTask.assignedTo.length!=0?"":filederror}</small>
                    </div>
                    <div class='d-flex flex-column w-45'>
                    <label for="exampleFormControlInput1" class="form-label">Status <span class='text-danger'>*</span></label>
                    <input
                        type="text"
                        placeholder="Status"
                        value={newTask.status}
                        onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                        class="form-control" id="exampleFormControlInput1"
                    />
                    <small class='text-danger'>{newTask.status.length!=0?"":filederror}</small>
                    </div>
                </div>

                <div class="mb-3 p-3 d-flex justify-content-between align-items-center w-100">
                    <div class='d-flex flex-column w-45'>
                    <label for="exampleFormControlInput1" class="form-label">Priority <span class='text-danger'>*</span></label>
                    <input
                        type="text"
                        placeholder="Priority"
                        value={newTask.priority}
                        onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                        class="form-control" id="exampleFormControlInput1"
                    />
                    <small class='text-danger'>{newTask.priority.length!=0?"":filederror}</small>
                    </div>
                    <div class='d-flex flex-column w-45'>
                    <label for="exampleFormControlInput1" class="form-label">Date <span class='text-danger'>*</span></label>
                    <input
                        type="date"
                        value={newTask.dueDate}
                        onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                        class="form-control" id="exampleFormControlInput1"
                    />
                    <small class='text-danger'>{newTask.dueDate.length!=0?"":filederror}</small>
                    </div>
                </div>
                <div class="mb-3 p-3 ">
                    <label
                     for="exampleFormControlTextarea1" 
                    class="form-label"
                    
                    >Comments</label>
                    <textarea 
                    class="form-control"
                     id="Comments"
                      rows="3 "
                      type="text"
                      placeholder="Comments"
                      value={newTask.comments}
                      onChange={(e) => setNewTask({ ...newTask, comments: e.target.value })}
                      ></textarea>
                      <small class='text-danger'>{newTask.comments.length!=0?"":filederror}</small>
                </div>
                </Modal.Body>
                <Modal.Footer>
                {editMode ? (
                        <button onClick={()=>{handleSaveTask()}} class="btn btn-success">Save Task</button>
                    ) : (
                        <button onClick={()=>{handleAddTask()}} class="btn btn-success">Add Task</button>
                    )}
                <button type="button" class="btn btn-warning" onClick={handleClose}>Cancel</button>

                </Modal.Footer>

            </Modal>
            <Toaster  newtaskadd={newtaskadd} taskdelete={taskdelete} edittask={edittask}/>
        </>
    );
};

export default Table;
