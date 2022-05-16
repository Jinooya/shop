import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import bg from "./img/bg.png";
import data from "./data.js";
import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  let [shoes] = useState(data);
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#cart">Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div
        className="main-bg"
        style={{ backgroundImage: "url(" + bg + ")" }}
      ></div>
      <div className="container">
        <div className="row">
          {shoes.map((a, i) => {
            return <Card shoes={shoes[i]} i={i + 1} />;
          })}
        </div>
      </div>
    </div>
  );
}

function Card(props) {
  return (
    <div className="col-md-4">
      <img
        src={"https://codingapple1.github.io/shop/shoes" + props.i + ".jpg"}
        width="80%"
      />
      <h4> {props.shoes.title} </h4>
      <p> {props.shoes.price} </p>
      <p> {props.shoes.content} </p>
    </div>
  );
}

export default App;
