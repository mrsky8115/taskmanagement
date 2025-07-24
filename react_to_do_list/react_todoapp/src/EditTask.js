import React,{useEffect, useState} from "react";
const EditTask=({task,afterUpdate})=>
{
    const[editedTask,setEditedTask]=useState({...task})
    useEffect(()=>
    {
        setEditedTask({...task});
    },[task]);
      
    const handleInput=(event)=>
    {
        setEditedTask((prevTask)=>({
            ...prevTask,
            [event.target.name]:(event.target.type==="checkbox")?event.target.checked:event.target.value
        }));
    }

    const handleSubmit=async(event)=>
    {
        event.preventDefault();
        try{
            const response = await fetch(`http://localhost:8000/apis/todolist/${editedTask.id}/`,{
                method:'PUT',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(editedTask)
            })
           if(response.ok)
           {
            const updatedTodo=await response.json();
            afterUpdate(updatedTodo);
            window.location.reload();
            alert("task updated sucessfully...")
           }
           else{
            console.error("failed to update task")
           }
        }
           catch(error)
           {
            console.error("Error :",error)
           }
        };

        
        
        return(
            <div>
            <form className="mt-4" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="title">Title</label>
                <input type="text" className="form-control" id="title"
                placeholder="Enter Task title" name="title" value={editedTask.title}
                required 
                onChange={handleInput}/>
            </div>

            <div className="mb-3">
                <label htmlFor="description">Description</label>
                <textarea className="form-control" id="description"
                placeholder="Task description" name="description" value={editedTask.description}
                onChange={handleInput}/>
            </div>

           
            <button type="submit" className="btn btn-success">Update Task</button>

            </form>

          </div>  
        );
    };

export default EditTask;