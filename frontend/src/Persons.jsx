import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Grab the base URL from Render, OR use localhost if we are on our own computer
const BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

// Combine them safely!
const API_URL = `${BASE_URL}/api/persons/`;

function Persons() {
  const [persons, setPersons] = useState([]);
  const [formData, setFormData] = useState({ name: '', age: '', place: '', image: null });
  const [editingId, setEditingId] = useState(null);

  // 1. READ: Fetch all persons on load
  useEffect(() => {
    fetchPersons();
  }, []);

  const fetchPersons = async () => {
    try {
      const response = await axios.get(API_URL);
      setPersons(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  // Handle text input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input changes
  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // 2. CREATE & UPDATE: Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // We MUST use FormData instead of JSON to send files
    const data = new FormData();
    data.append('name', formData.name);
    data.append('age', formData.age);
    data.append('place', formData.place);
    
    // Only append image if a new file was selected
    if (formData.image instanceof File) {
      data.append('image', formData.image);
    }

    try {
      if (editingId) {
        // UPDATE existing record
        await axios.put(`${API_URL}${editingId}/`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setEditingId(null);
      } else {
        // CREATE new record
        await axios.post(API_URL, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      
      // Reset form and refresh list
      setFormData({ name: '', age: '', place: '', image: null });
      document.getElementById('imageInput').value = ''; // Clear file input UI
      fetchPersons();
    } catch (error) {
      console.error("Error saving data", error);
    }
  };

  // Load a person's data into the form for editing
  const handleEdit = (person) => {
    setEditingId(person.id);
    setFormData({
      name: person.name,
      age: person.age,
      place: person.place,
      image: person.image // Keep URL reference, don't re-upload unless changed
    });
  };

  // 3. DELETE: Remove a person
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}${id}/`);
      fetchPersons(); // Refresh the list
    } catch (error) {
      console.error("Error deleting data", error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Person Manager</h1>
      
      {/* --- FORM SECTION --- */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '30px', border: '1px solid #ccc', padding: '15px' }}>
        <h3>{editingId ? 'Edit Person' : 'Add New Person'}</h3>
        
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} required />
        <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleInputChange} required />
        <input type="text" name="place" placeholder="Place" value={formData.place} onChange={handleInputChange} required />
        
        <input id="imageInput" type="file" accept="image/*" onChange={handleImageChange} />
        
        <button type="submit" style={{ marginLeft: '10px' }}>
          {editingId ? 'Update' : 'Save'}
        </button>
        
        {editingId && (
          <button type="button" onClick={() => { setEditingId(null); setFormData({name:'', age:'', place:'', image:null}) }}>
            Cancel Edit
          </button>
        )}
      </form>

      {/* --- LIST SECTION --- */}
      <div>
        {persons?.map((person) => (
          <div key={person.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
            
            {person.image && (
              <img src={person.image} alt={person.name} style={{ width: '80px', height: '80px', objectFit: 'cover', marginRight: '15px', borderRadius: '5px' }} />
            )}
            
            <div>
              <strong>{person.name}</strong> (Age: {person.age}) - {person.place}
              <br />
              <button onClick={() => handleEdit(person)} style={{ marginRight: '10px', marginTop: '5px' }}>Edit</button>
              <button onClick={() => handleDelete(person.id)} style={{ color: 'red' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Persons;
