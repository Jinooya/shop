import "./style/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import bg from "./img/bg.jpg";
import data from "./data.js";
import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Detail from "./routes/Detail.js";
import axios from "axios";
import Cart from "./routes/Cart.js";
import logo from "./img/logo.png";

function App() {
  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();
  let [more, setMore] = useState(2);

  useEffect(() => {
    var myArr = localStorage.getItem("watched");
    if (myArr == null) {
      localStorage.setItem("watched", JSON.stringify([]));
    } else {
      myArr = JSON.parse(myArr);
    }
  }, []);

  var myArr = localStorage.getItem("watched");
  myArr = JSON.parse(myArr);

  return (
    <div className="App">
      <Navbar bg="light" variant="light" className="nav">
        <Container>
          <Navbar.Brand
            className="logo"
            onClick={() => {
              navigate("/");
            }}
          >
            <img src={logo} />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/cart");
              }}
            >
              장바구니
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/about");
              }}
            >
              About
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div className="foundProduct">
        <div>CART({myArr ? myArr.length : 0})</div>
        <div>최근본상품</div>
        {myArr &&
          myArr.map((a) => (
            <div>
              <img
                src={"https://jinwoo45.github.io/shop/shoes" + (a + 1) + ".jpg"}
                width="80%"
              />
            </div>
          ))}

        <div>TOP🔼</div>
      </div>
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
        <Route path="/cart" element={<Cart></Cart>} />
        <Route path="/about" element={<div>어바웃페이지입니다.</div>} />
        <Route
          path="/"
          element={
            <div>
              <div
                className="main-bg"
                style={{ backgroundImage: "url(" + bg + ")" }}
              ></div>

              <div className="container">
                <h4 className="sectionTitle">Brand New Shoes 👟</h4>
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
              {more > 3 ? (
                <button
                  className="moreBtn"
                  onClick={() => {
                    axios
                      .get(
                        // `https://codingapple1.github.io/shop/data${more}.json`
                        `https://jinwoo45.github.io/shop/data${more}.json`
                      )
                      .then((결과) => {
                        let copy = [...shoes, ...결과.data];
                        setShoes(copy);
                      });
                    setMore(more + 1);
                    console.log(more);
                  }}
                >
                  끝
                </button>
              ) : (
                <button
                  className="moreBtn"
                  onClick={() => {
                    axios
                      .get(`https://jinwoo45.github.io/shop/data${more}.json`)
                      .then((결과) => {
                        let copy = [...shoes, ...결과.data];
                        setShoes(copy);
                      });
                    setMore(more + 1);
                    console.log(more);
                  }}
                >
                  더보기 +
                </button>
              )}
            </div>
          }
        />
        <Route path="*" element={<div>준비중인 페이지</div>} />
      </Routes>
      {/* footer  */}
      <footer className="jumbotron text-center mt-5 mb-0">
        <h3 className="text-secondary">ShoeShop</h3>
        <p>
          ShoeShop’s Homepage is powered by
          <span className="text-primary"> codingapple</span> / Designed by
          <span className="text-primary"> jinwoo</span>
        </p>
      </footer>
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
    <div className="col-md-4 shoeBox">
      <img
        src={"https://jinwoo45.github.io/shop/shoes" + props.i + ".jpg"}
        width="80%"
      />
      <h4
        className="shoesTitle"
        onClick={() => {
          props.navigate("/detail/" + (props.i - 1));
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
