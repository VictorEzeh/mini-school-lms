import { useState } from 'react'
import Navbar from '../components/Navbar'
import { addDoc, collection, deleteDoc, updateDoc, doc, } from 'firebase/firestore';
import { db } from '../firebase/config';

function Assignments({ user, role }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  
  const [assignments, setAssignments] = useState([]);

  const [editingAssignment, setEditingAssignment] = useState(null);
  
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const handleAssignment = async (e) => {
    e.preventDefault();

    if(!title || !description){
      alert("Please fill all fields")
      return;
    }

    try{
      const docRef = await addDoc(collection(db, "assignments"), {
        title,
        description,
        createdAt: Date.now(),
        createdBy: user.email
      });

      const newAssignment = {
        id: docRef.id,
        title,
        description,
        createdBy: user.email
      };

      setAssignments([...assignments, newAssignment]);

      setTitle("");
      setDescription("");
    }catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "assignments", id));

    setAssignments(
      assignments.filter((assignment) => assignment.id !== id)
    );
  };

  const openModal = (assignment) => {
    setEditingAssignment(assignment);

    setEditTitle(assignment.title);

    setEditDescription(assignment.description);
  };

  const handleUpdate = async () => {
    await updateDoc(
      doc(
        db, 
        "assignments", 
        editingAssignment.id
      ), 
      {
        title: editTitle, 
        description: editDescription, 
      }
    );

    setAssignments(
      assignments.map((assignment) =>
        assignment.id === editingAssignment.id
          ? {
              ...assignment,
              title: editTitle,
              description: editDescription,
            }
          : assignment
      )
    );

    setEditingAssignment(null);
  };

  // const handleEdit = async (assignment) => {
  //   const newTitle = prompt("Enter a new title", assignment.title);
  //   const newDescription = prompt("Enter a new description", assignment.description)

  //   if(!newTitle){ 
  //     return assignment.title;
  //   } else{
  //     await updateDoc(doc(db, "assignments", assignment.id), {
  //     title: newTitle,
  //   });
  //   }

  //   if(!newDescription){
  //     return assignment.description;
  //   }else{
  //     await updateDoc(doc(db, "assignments", assignment.id), {
  //     description: newDescription,
  //   });
  //   }

  //   setAssignments(
  //     assignments.map((item) =>
  //       item.id === assignment.id ? {...item, title: newTitle, description: newDescription, } : item
  //     )
  //   );
  // };


  return (
    <>
      <Navbar/>
        <div className="assignments-page">
          <h1>Assignments</h1>

          {
              role === "teacher" 
              
              &&
               
            (<form className="assignment-form" onSubmit={handleAssignment}>
              <input 
                type="text"
                placeholder='Assignment Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)} 
              />

              <textarea 
                placeholder='Assignment description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <button>Add Assignment</button>
            </form>)
          }
          

          <div className="assignment-list">
            {
              assignments.map((assignment) => ( 
                <div key={assignment.id} className="assignment-card">
                  <h3>{assignment.title}</h3>
                  <p>{assignment.description}</p>
                  <small>Created by: {assignment.createdBy}</small>

                  <div className="assignment-actions">
                    <button onClick={() => openModal(assignment)}>Edit</button>

                    <button className="delete-btn" onClick={() => handleDelete(assignment.id)}>Delete</button>
                  </div>
                </div>
              ))}
          </div>

          {editingAssignment && (
            <div className="modal-overlay">
              <div className="edit-modal">
                <h2>Edit Assignment</h2>

                <input 
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />

                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />

                <div className="modal-buttons">
                  <button onClick={handleUpdate}>Save Changes</button>
                  <button className='cancel-btn' onClick={() => setEditingAssignment(null)}>Cancel</button>
                </div>
              </div>
            </div>
          )}
        </div> 
    </>
  )
}

export default Assignments;