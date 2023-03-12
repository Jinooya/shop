import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Nav, Button } from "react-bootstrap";
import { addItem } from "../store.js";
import { useDispatch } from "react-redux";

import "./../style/App.css";

function Detail(props: any) {
  //useEffect안의 코드는 html렌더링 후에 동작합니다.
  let { id } = useParams();
  let found = props.shoes.find(function (x: any) {
    return x.id == id;
  });
  console.log(found);

  let [alert, setAlert] = useState(true);
  let [tab, setTab] = useState(0);
  let [fade2, setFade2] = useState("");
  let dispatch = useDispatch();

  useEffect(() => {
    let took: any = localStorage.getItem("watched");
    if (took !== null) {
      took = JSON.parse(took);
      took.push(found.id);

      took = new Set(took);
      took = Array.from(took);

      localStorage.setItem("watched", JSON.stringify(took));
    }
  }, []);

  useEffect(() => {
    let a = setTimeout(() => {
      setAlert(false);
    }, 2000);

    return () => {
      clearTimeout(a);
    };
  });
  let navigate = useNavigate();

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
          할인 이벤트를 적용해보세요
          <Button variant="primary">구매</Button>
        </div>
      ) : null}

      <div className="row">
        <div className="col-md-6">
          <img
            alt="상품이미지"
            src={
              "https://jinwoo45.github.io/shop/shoes" + (found.id + 1) + ".jpg"
            }
            width="60%"
          />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{found.title}</h4>
          <p> {found.content}</p>
          <p> {found.price}</p>
          <button
            className="btn btn-danger"
            onClick={() => {
              dispatch(
                addItem({
                  id: found.id,
                  name: found.title,
                  price: found.price,
                  count: 1,
                })
              );
              navigate("/cart");
            }}
          >
            장바구니
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
      <TabContent found={found} tab={tab}></TabContent>
    </div>
  );
}

interface TabProps {
  tab: number;
  found: {
    info: string;
    rev: string;
    qna: string;
  };
}

function TabContent({ tab, found }: TabProps) {
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
        [
          <div>{found.info}</div>,
          <div>{found.rev}</div>,
          <div>{found.qna}</div>,
        ][tab]
      }
    </div>
  );
}

export default Detail;
