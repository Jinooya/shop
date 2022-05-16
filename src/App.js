import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import bg from "./img/bg.png";
import data from "./data.js";
import React, { useState } from "react";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Detail from "./routes/Detail.js";

function App() {
  let [shoes] = useState(data);
  let navigate = useNavigate();
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
                // navigate(-1)뒤로가기;
                // navigate(1)앞으로가기;
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/detail");
              }}
            >
              Detail
            </Nav.Link>
            {/* <Link to="/">Home</Link>
            <Link to="/detail">Cart </Link> */}
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route
          path="/detail"
          element={
            <div>
              <Detail></Detail>
            </div>
          }
        />
        <Route path="/about" element={<div>어바웃페이지임</div>} />
        <Route
          path="/"
          element={
            <div>
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
          }
        />
      </Routes>
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
