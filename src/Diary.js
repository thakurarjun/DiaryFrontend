import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import numbersService from "./number";
const Person = ({ persons, onDeletePersons }) => {
  return (
    <ul>
      {persons.name} {persons.number}
      <button onClick={() => onDeletePersons(persons.id, persons.name)}>
        delete
      </button>
    </ul>
  );
};

const PersonForm = ({
  addPerson,
  onChangeName,
  onChangeNumbers,
  name,
  number,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input required value={name} onChange={onChangeName} />
      </div>
      <div>
        number: <input required value={number} onChange={onChangeNumbers} />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};
const Persons = ({ persons, onDeletePersons }) => {
  return (
    <ul>
      {persons.map((person) => (
        <Person persons={person} onDeletePersons={onDeletePersons} />
      ))}
    </ul>
  );
};
const Filter = ({ filterName, onChangeFilter }) => {
  return (
    <>
      filter shown with:
      <input value={filterName} onChange={onChangeFilter} />
    </>
  );
};
const Notification = ({ message, type }) => {
  if (message === "") {
    return <div></div>;
  }
  return <div className={type}>{message}</div>;
};

const Diary = () => {
  const [persons, setPersons] = useState([]);
  const [inputName, setName] = useState("");
  const [numbers, setNumbers] = useState("");
  const [filterName, setFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [notificationType, setNotificationType] = useState("success");
  const [timeOut, setTimeOut] = useState("0");
  useEffect(() => {
    numbersService.getPersons().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const onChangeNumbers = (event) => {
    setNumbers(event.target.value);
  };
  const onChangeName = (event) => {
    setName(event.target.value);
  };
  const onChangeFilter = (event) => {
    setFilter(event.target.value);
  };
  const onDeletePersons = (id) => {
    console.log(id);
    if (window.confirm("Are you sure you want to delete person " + id)) {
      numbersService.deletePersons(id).then(() => {
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
        setPersons(persons.filter((person) => person.id !== id));
        setErrorMessage(`${inputName} deleted`);

        setNotificationType("error");
        setName("");
        setNumbers("");
      })
      .catch((error) => { alert (`information of '${inputName} has already been removed from server`)
      setNotificationType(notificationType.filter(n => n.id !== id));

      })
      
    }
  };

  const addPerson = (event) => {
    event.preventDefault();
    let personfound = persons.filter(
      (person) => person.name.toLowerCase() === inputName.toLocaleLowerCase()
    );
    if (personfound.length > 0) {
      if (
        window.confirm(
          `${inputName} already exists in phonebook. Do you want to replace the old no with a new one?`
        )
      ) {
        let updatedContact = {
          name: inputName,
          number: numbers,
        };
        numbersService
          .updatePersons(personfound[0].id, updatedContact)
          .then((returnedContact) => {
            setPersons(
              persons.map((p) =>
                p.name.toLowerCase() === returnedContact.data.name.toLowerCase()
                  ? returnedContact.data
                  : p
              )
            );
            setErrorMessage(`${inputName} updated`);
            setNotificationType("success");
            setName("");
            setNumbers("");
          });
      }
      return;
    }
    const newContact = {
      name: inputName,
      number: numbers,
    };

    numbersService.create(newContact).then((response) => {
      setTimeout(() => {
        setErrorMessage("")
      }, 5000);
      setPersons(persons.concat(response.data));
      setErrorMessage(`${inputName} added`);
      setNotificationType("success");
      setName("");
      setNumbers("");
    });
  };
  const filteredPersons = filterName
    ? persons.filter(
        (person) =>
          person.name.toLowerCase().search(filterName.toLocaleLowerCase()) !==
          -1
      )
    : persons;

  return (
    <div className="container" align="center">
      <h2>Filter</h2>
      <Notification message={errorMessage} type={notificationType} g />
      <Filter filterName={filterName} onChangeFilter={onChangeFilter} />
      <h2>Phonebook</h2>

      <PersonForm
        addPerson={addPerson}
        onChangeName={onChangeName}
        onChangeNumbers={onChangeNumbers}
        name={inputName}
        number={numbers}
      />

      <h2>Numbers</h2>
      <Persons persons={filteredPersons} onDeletePersons={onDeletePersons} />
    </div>
  );
};

export default Diary;
