import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Nav, Button } from "react-bootstrap";
import { addItem } from "./../store.js";
import { useDispatch } from "react-redux";
import "./../style/App.css";

function Detail(props) {
  useEffect(() => {
    //useEffect안의 코드는 html렌더링 후에 동작합니다.
    let a = setTimeout(() => {
      setAlert(false);
    }, 2000);

    return () => {
      clearTimeout(a);
    };
  });
  let navigate = useNavigate();

  let { id } = useParams();
  let 찾은상품 = props.shoes.find(function (x) {
    return x.id == id;
  });
  let [alert, setAlert] = useState(true);
  let [tab, setTab] = useState(0);
  let [fade2, setFade2] = useState("");
  let dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      setFade2("end");
    }, 200);
    return () => {
      setFade2("");
    };
  }, []);

  return (
    <div className={"container start " + fade2}>
      {alert === true ? (
        <div className="alert alert-warning">
          2초이내 구매시 할인
          <Button variant="primary">메롱</Button>
        </div>
      ) : null}

      <div className="row">
        <div className="col-md-6">
          <img
            src={"https://codingapple1.github.io/shop/shoes1.jpg"}
            width="100%"
          />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p> {찾은상품.content}</p>
          <p> {찾은상품.price}</p>
          <button
            className="btn btn-danger"
            onClick={() => {
              dispatch(addItem({ id: 1, name: "red knit", count: 1 }));
              navigate("/cart");
            }}
          >
            주문하기
          </button>
        </div>
      </div>

      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link
            eventKey="link0"
            onClick={() => {
              setTab(0);
            }}
          >
            상세정보
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link1"
            onClick={() => {
              setTab(1);
            }}
          >
            리뷰
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link2"
            onClick={() => {
              setTab(2);
            }}
          >
            Q&amp;A
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tab={tab}></TabContent>
    </div>
  );
}

function TabContent({ tab }) {
  let [fade, setFade] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setFade("end");
    }, 200);
    return () => {
      setFade("");
    };
  }, [tab]);

  return (
    <div className={"start " + fade}>
      {
        [<div>너무작음</div>, <div>리뷰없음</div>, <div>물어보지마세요</div>][
          tab
        ]
      }
    </div>
  );

  // if (탭 == 0) {
  //   return <div>너무작음</div>;
  // }
  // if (props.tab == 1) {
  //   return <div>리뷰없음</div>;
  // }
  // if (props.tab == 2) {
  //   return <div>물어보지마세요</div>;
  // }
}

export default Detail;
