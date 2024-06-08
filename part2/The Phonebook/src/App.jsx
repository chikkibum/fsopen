import  { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification'; // Import Notification component

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null); // State for notification message
  const [notificationVisible, setNotificationVisible] = useState(false); // State for notification visibility

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const person = persons.find(p => p.name.toLowerCase() === newName.toLowerCase());

    if (person) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...person, number: newNumber };
        axios
          .put(`http://localhost:3001/persons/${person.id}`, updatedPerson)
          .then(response => {
            setPersons(persons.map(p => p.id !== person.id ? p : response.data));
            setNewName('');
            setNewNumber('');
            showNotification(`${person.name}'s number updated successfully`); // Show notification after successful update
          });
      }
    } else {
      const newPerson = { name: newName, number: newNumber };
      axios
        .post('http://localhost:3001/persons', newPerson)
        .then(response => {
          setPersons([...persons, response.data]);
          setNewName('');
          setNewNumber('');
          showNotification(`${response.data.name} added successfully`); // Show notification after successful addition
        });
    }
  };
  
  const handleDelete = (id) => {
    const person = persons.find(p => p.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      axios
        .delete(`http://localhost:3001/persons/${id}`)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id));
// Inside handleSubmit, handleDelete, and catch blocks

showNotification(`${person.name} deleted successfully`, 'success');
 // Show notification after successful deletion
        })
        .catch(error => {
          console.error("Error deleting person:", error);
          if (error.response) {
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
            console.error("Response headers:", error.response.headers);
          }
        });
    }
  };

// App.jsx

const showNotification = (message, type) => {
  setNotification({ message, type });
  setNotificationVisible(true);
  setTimeout(() => {
    setNotification(null);
    setNotificationVisible(false);
  }, 5000); // Hide notification after 5 seconds
};


  const filteredPersons = persons.filter(person =>
    person.name && person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Phonebook</h2>
            {notificationVisible && <Notification message={notification} />} 
      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} handleDelete={handleDelete} />
{/* Render Notification component */}
    </div>
  );
};

export default App;
