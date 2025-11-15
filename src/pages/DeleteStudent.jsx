import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './StudentPages.css';

const API = "http://localhost:5000/students";


const DeleteStudent = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const [student , setStudents] = useState(
      {name :'' , age : '', department : ''}
    );
    const [deleting , setDeleting] = useState(false);

    useEffect(()=> {
        const load = async () =>
        {
            try{
                const res = await axios.get(`${API}/${id}`);
                setStudents({name : res.data.name||'',
                       age : res.data.age|| '',
                       department : res.data.department || '' });
            }catch(err){

                console.error("Fetch student error" , err);
            };
            
        };
        load();

    } , [id]);

    const handleDelete = async () => {

        setDeleting(true);
        try{
            await axios.delete(`${API}/${id}`);
            navigate('/');
        }catch(err)
        {
            console.error("Delete error" , err)
        }
        finally
        {
            setDeleting(false);
        }

    }

  return (
    <div className='page-container'>
        <h2>Delete Student</h2>

        <p> Are you sure you want to delete <strong>{student.name}</strong></p>

        <div className='card-actions'>
            <button className='btn-delete' onClick={handleDelete} disabled={deleting}>

                {deleting ? 'Deleting..' : 'Yes , Delete' }
            </button>
            <Link to="/" className="btn-secondary">Cancel</Link>

        </div>

    </div>
  )
}

export default DeleteStudent