import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import bg from "./img/bg.png";
import data from "./data.js";
import React, { useState } from "react";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Detail from "./routes/Detail.js";
import axios from "axios";

function App() {
  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();
  let [more, setMore] = useState(2);

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand
            className="logo"
            onClick={() => {
              navigate("/");
            }}
          >
            NewBalance
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              HOME
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/cart");
              }}
            >
              CART
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Container>
      </Navbar>
      <Routes>
        <Route
          path="/detail"
          element={
            <div>
              <Detail shoes={shoes}></Detail>
            </div>
          }
        />
        <Route path="/detail/:id" element={<Detail shoes={shoes} />} />
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
                <h4>brand new shoes 👟</h4>
                <div className="row">
                  {shoes.map((a, i) => {
                    return (
                      <Card
                        key={i}
                        navigate={navigate}
                        shoes={shoes[i]}
                        i={i + 1}
                      />
                    );
                  })}
                </div>
              </div>

              <button
                className="moreBtn"
                onClick={() => {
                  axios
                    .get(`https://codingapple1.github.io/shop/data${more}.json`)
                    .then((결과) => {
                      let copy = [...shoes, ...결과.data];
                      setShoes(copy);
                    });
                  setMore(more--);
                  console.log(more);
                }}
              >
                더보기 +
              </button>

              <footer>
                <h1>ShoeShop</h1>
                <p>call 010-5032-3572</p>
              </footer>
            </div>
          }
        />
        <Route path="*" element={<div>준비중인 페이지</div>} />
      </Routes>
    </div>
  );
}
function Event() {
  return (
    <div>
      <h3>오늘의 이벤트</h3>
      <Outlet></Outlet>
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
      <h4
        className="shoesTitle"
        onClick={() => {
          props.navigate("/detail/0");
        }}
      >
        {props.shoes.title}
      </h4>
      <p> {props.shoes.price} </p>
      <p> {props.shoes.content} </p>
    </div>
  );
}

export default App;
