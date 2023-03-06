import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, Container, Modal } from "react-bootstrap";
import Entry from "./single-entry.component";

const Entries = () => {
  const [entries, setEntries] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  const [changeEntry, setChangeEntry] = useState({ change: false, id: 0 });
  const [changeIngredient, setChangeIngredient] = useState({
    change: false,
    id: 0,
  });
  const [newIngredientName, setNewIngredientName] = useState("");
  const [addNewEntry, setAddNewEntry] = useState(false);
  const [newEntry, setNewEntry] = useState({
    dish: "",
    ingredients: "",
    calories: "",
    fat: 0,
  });

  useEffect(() => {
    getAllEntries();
  }, []);

  if (refreshData) {
    setRefreshData(false);
    getAllEntries();
  }

  return (
    <div>
      <Container>
        <Button onClick={() => setAddNewEntry(true)}>
          Track today's calories
        </Button>
      </Container>
      <Container>
        {entries != null &&
          entries.map((entry, i) => (
            <Entry
              entryData={entry}
              deleteSingleEntry={deleteSingleEntry}
              setChangeIngredient={setChangeIngredient}
              setChangeEntry={setChangeEntry}
            />
          ))}
      </Container>

      {/* Popup to add entry in db.*/}
      <Modal show={addNewEntry} onHide={() => setAddNewEntry(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Calorie Entry</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group>
            <Form.Label>Dish</Form.Label>
            <Form.Control
              onChange={(event) => {
                newEntry.dish = event.target.value;
              }}
            ></Form.Control>

            <Form.Label>Ingredients</Form.Label>
            <Form.Control
              onChange={(event) => {
                newEntry.ingredients = event.target.value;
              }}
            ></Form.Control>

            <Form.Label>Calories</Form.Label>
            <Form.Control
              onChange={(event) => {
                newEntry.calories = event.target.value;
              }}
            ></Form.Control>

            <Form.Label>Fats</Form.Label>
            <Form.Control
              onChange={(event) => {
                newEntry.fat = event.target.value;
              }}
              type="number"
            ></Form.Control>

            <Button onClick={() => addSingleEntry()}>Add</Button>
            <Button onClick={() => setAddNewEntry(false)}>Cancel</Button>
          </Form.Group>
        </Modal.Body>
      </Modal>

      {/* Popup to update entry in db. */}
      <Modal
        show={changeIngredient.change}
        onHide={() => setChangeIngredient({ change: false, id: 0 })}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Change Ingredient</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group>
            <Form.Label>New Ingredients</Form.Label>
            <Form.Control
              onChange={(event) => {
                setNewIngredientName(event.target.value);
              }}
            ></Form.Control>

            <Button onClick={() => changeIngredientForEntry}>Change</Button>
            <Button
              onClick={() => setChangeIngredient({ change: false, id: 0 })}
            >
              Cancel
            </Button>
          </Form.Group>
        </Modal.Body>
      </Modal>

      {/*  */}
      <Modal
        show={changeEntry.change}
        onHide={() => setChangeEntry({ change: false, id: 0 })}
        centered
      >
        <Modal.Header>
          <Modal.Title></Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group>
            <Form.Label>Dish</Form.Label>
            <Form.Control
              onChange={(event) => {
                newEntry.dish = event.target.value;
              }}
            ></Form.Control>

            <Form.Label>Ingredients</Form.Label>
            <Form.Control
              onChange={(event) => {
                newEntry.ingredients = event.target.value;
              }}
            ></Form.Control>

            <Form.Label>Calories</Form.Label>
            <Form.Control
              onChange={(event) => {
                newEntry.calories = event.target.value;
              }}
            ></Form.Control>

            <Form.Label>Fats</Form.Label>
            <Form.Control
              onChange={(event) => {
                newEntry.fat = event.target.value;
              }}
              type="number"
            ></Form.Control>

            <Button onClick={() => changeSingleEntry}>Change</Button>
            <Button onClick={() => setChangeEntry({ change: false, id: 0 })}>
              Cancel
            </Button>
          </Form.Group>
        </Modal.Body>
      </Modal>
    </div>
  );

  function changeIngredientForEntry() {
    changeIngredient.change = false;
    var url =
      "http://localhost:4000/api/update/ingradient/" + changeIngredient.id;
    axios
      .put(url, {
        ingredients: newIngredientName,
      })
      .then((response) => {
        console.log(response.status);
        if (response.status === 200) {
          setRefreshData(true);
        }
      });
  }

  function changeSingleEntry() {
    changeEntry.change = false;
    var url = "http://localhost:4000/api/entry" + changeEntry.id;
    axios.put(url, newEntry).then((response) => {
      if (response.status == 200) {
        setRefreshData(true);
      }
    });
  }

  function addSingleEntry() {
    setAddNewEntry(false);
    var url = "http://localhost:4000/api/entry";
    axios
      .post(url, {
        ingredients: newEntry.ingredients,
        dish: newEntry.dish,
        calories: newEntry.calories,
        fat: parseFloat(newEntry.fat),
      })
      .then((response) => {
        if (response.status == 201) {
          setRefreshData(true);
        }
      });
  }

  function deleteSingleEntry(id) {
    var url = "http://localhost:4000/api/entry/" + id;
    axios.delete(url, {}).then((response) => {
      if (response.status == 200) {
        setRefreshData(true);
      }
    });
  }

  function getAllEntries() {
    var url = "http://localhost:4000/api/entries";
    axios
      .get(url, {
        responseType: "json",
      })
      .then((response) => {
        if (response.status == 200) {
          setEntries(response.data);
        }
      });
  }
};

export default Entries;
