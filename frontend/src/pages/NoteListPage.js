import React from 'react'
import {useState, useEffect, useRef} from 'react';
import ListItem from '../components/ListItem';
import AddButton from '../components/AddButton'


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

const NotesListPage = () => {
  let [notes, setNotes] = useState([])

  useEffect(() => {
    const getNotes = async () => {
      var csrftoken = getCookie('csrftoken');
        let response = await fetch('api/notes/', {
          method: 'GET',
          'headers': {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
          }
        })
        let data = await response.json()
        if (data != null){
          setNotes(data)
        }
    }
    getNotes()
  }, [])

  return (
      <div className="notes">
          <div className="notes-header">
              <h2 className="notes-title">&#9782; Notes</h2>
              <p className="notes-count">{notes.length}</p>
          </div>

          <div className="notes-list">
              {notes.map((note, index) => (
                  <ListItem key={index} note={note} />
              ))}
          </div>
          <AddButton />
      </div>
  )
}

export default NotesListPage

