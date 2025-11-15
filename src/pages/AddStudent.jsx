import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import "./StudentPages.css"

const API = "http://localhost:5000/students";


const AddStudent = () => {

    const [form , setForm] = useState({name : '' , age : '' , department : ''});
    const [saving , setSaving] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => setForm({...form , [e.target.name] : e.target.value})

    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        setSaving(true);

        try{
            await axios.post(API , {
                name : form.name,
                age : form.age ,
                department : form.department
            });

            navigate("/");
        }catch(err)
        {
            console.error("Add Error" , err);
        }
        finally
        {
            setSaving(false);
        }
    }


    return (
    <div className='page-container'>
        <h2> Add Student</h2>
        <form onSubmit={handleSubmit} className='student-form'>
            <label>Name</label>
            <input name='name' value={form.name} onChange={handleChange} required/>
            
            <label>Age</label>
            <input name='age' value={form.age} onChange={handleChange} required/>            
            
            <label>Department</label>
            <input name='department' value={form.department} onChange={handleChange} required/>

            <button className='btn-primary' type='submit' disabled={saving}>

                    {saving ? 'Saving' : 'Save Changes'}

            </button>
        </form>
    </div>
  )
}

export default AddStudent