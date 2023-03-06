import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Row, Button, Card, Col } from "react-bootstrap";

const Entry = ({
  entryData,
  setChangeIngredient,
  deleteSingleEntry,
  setChangeEntry,
}) => {
  return (
    <Card>
      <Row>
        <Col>Dish: {entryData !== undefined && entryData.dish} </Col>
        <Col>
          Ingredients: {entryData !== undefined && entryData.ingredients}{" "}
        </Col>
        <Col>Calories: {entryData !== undefined && entryData.calories} </Col>
        <Col>Fats: {entryData !== undefined && entryData.fat} </Col>
        <Col>
          <Button onClick={() => deleteSingleEntry(entryData._id)}>
            Delete entry
          </Button>
        </Col>
        <Col>
          <Button onClick={() => changeIngredient}>Change ingredients</Button>
        </Col>
        <Col>
          <Button onClick={() => changeEntry}>Update entry</Button>
        </Col>
      </Row>
    </Card>
  );

  function changeIngredient() {
    setChangeIngredient({
      change: true,
      id: entryData._id,
    });
  }

  function changeEntry() {
    setChangeEntry({
      change: true,
      id: entryData._id,
    });
  }
};

export default Entry;
