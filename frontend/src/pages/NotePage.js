import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {ReactComponent as ArrowLeft} from "../assets/arrow-left.svg";
import { useNavigate } from "react-router-dom";


function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim()
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


const NotePage = () => {
    let navigate = useNavigate();
    const { id } = useParams();

    let [note, setNote] = useState(null)

    useEffect(() => {
        const getNote = async () => {
            if (id === 'new') return
            var csrftoken = getCookie('csrftoken');
            let response = await fetch(`/api/notes/${id}/`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken
                },
            })
            let data = await response.json()
            setNote(data)
        }
        getNote()
    }, [id])

    let createNote = async () => {
        var csrftoken = getCookie('csrftoken');
        fetch(`/api/notes/`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify(note)
        }).then(() => navigate('/'))
    }


    let updateNote = async () => {
        var csrftoken = getCookie('csrftoken');
        fetch(`/api/notes/${id}/`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify(note)
        }).then(() => navigate('/'))
        
    }


    let deleteNote = () => {
        var csrftoken = getCookie('csrftoken');
        fetch(`/api/notes/${id}/`, {
            method: 'DELETE',
            'headers': {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            }
        }).then(() => navigate('/'))
    }

    let handleSubmit = () => {
        if (note == null){
            navigate('/')
        }
        else if (id !== 'new' && (note.body === '' || note.body === null)) {
            deleteNote()
        }else if (id !== 'new') {
            updateNote()
        } else if (id === 'new' && note.body !== null) {
            createNote()
        }   
    }

    let handleChange = (value) => {
        setNote(note => ({ ...note, 'body': value }))
    }
    return (
        <div className="note" >
            <div className="note-header">
                <h3>
                    <ArrowLeft onClick={handleSubmit} />
                </h3>
                {id !== 'new' ? (
                    <button onClick={deleteNote}>Delete</button>
                ) : (
                    <button onClick={handleSubmit}>Done</button>
                )}

            </div>
            <textarea onChange={(e) => { handleChange(e.target.value) }} value={note?.body}></textarea>
        </div>
    )
}

export default NotePage;

