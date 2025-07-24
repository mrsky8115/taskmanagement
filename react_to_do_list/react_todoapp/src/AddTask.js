import React,{useState} from "react";
export default function AddTask({addTask})
{
    const[newTask,setNewTask]=useState({
        title:'',
        description:'',
        is_completed: false
    });
    const handleInput=(event)=>
    {
        const{name,value}=event.target;
        setNewTask((prevTask)=>({
            ...prevTask,
            [name]:value
        }));
    }
    const handleSubmit=async(event)=>
    {
        event.preventDefault();
        try{
            const task=await fetch('http://localhost:8000/apis/todolist/',{
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(newTask)
            })
            .then(resp=>resp.json())
            .then(data=>{
                return data;
            })
            .catch(err=>console.log("Failed to create new task"));
            addTask(task);
            setNewTask({title:"",description:"",is_completed:false})
        }
        catch(err)
        {
            console.error("Error",err);
        }
        }
        return(
            <div>
            <form className="col-md-6 mx-auto" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type="text" className="form-control" id="title"
                placeholder="Enter Task title" name="title" value={newTask.title}
                required 
                onChange={handleInput}/>
            </div>

            <div className="form-group">
                <label htmlFor="description">Description</label>
                <input type="text" className="form-control" id="description"
                placeholder="Task description" name="description" value={newTask.description}
                onChange={handleInput}/>
            </div>

           
            <button type="submit" className="btn btn-success">Add Task</button>

            </form>

          </div>  
        )


    }