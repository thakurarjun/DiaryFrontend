import React from "react";
import { useState, useEffect } from "react";
import numbersService from "./number";
import loginService from "../src/login";
import Togglable from "./models/Togel";
import LoginForm from "./models/LoginForm";
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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  useEffect(() => {
    numbersService.getPersons().then((response) => {
      setPersons(response.data);
    });
  }, []);

  useEffect(() => {
    const loggedUserToken = window.localStorage.getItem(
      "loggedPhonebookappUser"
    );
    if (loggedUserToken) {
      const user = JSON.parse(loggedUserToken);
      setUser(user);
      numbersService.setToken(user.token);
    }
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
      numbersService
        .deletePersons(id)
        .then(() => {
          setTimeout(() => {
            setErrorMessage("");
          }, 5000);
          setPersons(persons.filter((person) => person.id !== id));
          setErrorMessage(`${inputName} deleted`);

          setNotificationType("error");
          setName("");
          setNumbers("");
        })
        .catch((error) => {
          alert(
            `information of '${inputName} has already been removed from server`
          );
          setNotificationType(notificationType.filter((n) => n.id !== id));
        });
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

    numbersService
      .create(newContact)
      .then((response) => {
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
        setPersons(persons.concat(response));
        setErrorMessage(`${inputName} added`);
        setNotificationType("success");
        setName("");
        setNumbers("");
      })
      .catch((error) => {
        setErrorMessage(error.response.data.error);
      });
  };
  const filteredPersons = filterName
    ? persons.filter(
        (person) =>
          person.name.toLowerCase().search(filterName.toLocaleLowerCase()) !==
          -1
      )
    : persons;
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem(
        "loggedPhonebookappUser",
        JSON.stringify(user)
      );
      numbersService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => {
    return (
            <Togglable buttonLabel='Log In'>
            <LoginForm
              username={username}
              password={password}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
              handleSubmit={handleLogin}
            ></LoginForm>
          </Togglable>
    );
  };

  const phoneBookForm = () => (
    <>
      <h2>Filter</h2>
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
    </>
  );

  return (
    <div className="container" align="center">
      <Notification message={errorMessage} type={notificationType} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p> {user.name} logged in</p>
          {phoneBookForm()}
        </div>
      )}
    </div>
  );
};

export default Diary;
