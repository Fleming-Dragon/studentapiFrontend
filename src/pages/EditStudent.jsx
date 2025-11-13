import {useState, useEffect } from "react"
import React from 'react'
import axios from "axios"
import { useNavigate , useParams } from "react-router-dom"
import './StudentPages.css';



const API = "http://localhost:5000/students";


const EditStudent = () => {

    const {id} = useParams();
    const navigate = useNavigate(); //home -> settings 
    const [form , setForm] = useState({name :'' , age : '', department : ''});
    const [loading , setLoading] = useState(true);
    const [saving , setSaving] = useState(false);

    useEffect(()=>{
        const load = async () => {
            try{
                const res = await axios.get(`${API}/${id}`);
                setForm(
                    {
                       name : res.data.name||'',
                       age : res.data.age|| '',
                       department : res.data.department || ''  
                    });
            }catch (err)
            {
                console.error("Fetch student errror" , err);
            }
            finally
            {
                    setLoading(false);
            }
        };

        load();
    } , [id]);


    const handleChange = (e) => setForm({...form, [e.target.name] : e.targe.value})


    const handleSubmit = async (e) => 
    {
        e.preventDefault();
        setSaving(true);
        try
        {
            await axios.put(`${API}/${id}` , 
                {
                    name : form.name,
                    age : form.age,
                    department : form.department
                }
        ); 
        
        navigate('/');
            
        }catch(err)
        {
            console.error("Update error" , err)
        }
        finally
        {
            setSaving(false);
        }



    };


    if (loading) return <div className="loading">Loading...</div>

  return (
    <div className="page-container">
        <h2>Edit Student</h2>
        <form onSubmit={handleSubmit} className="student-form">

            <label>Name*</label>
            <input name="name" value={form.name} onChange={handleChange} required/>
            
            <label>Age*</label>
            <input name="age" value={form.age} onChange={handleChange} required/>

            <label>Department*</label>
            <input name="department" value={form.department} onChange={handleChange} required/>

            <button type="submit" className="btn-primary" disabled={saving}>

                {saving ? 'Saving...' : 'Save Changes'}

            </button>
        </form>


    </div>
  )
}

export default EditStudent