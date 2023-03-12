import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addCount } from "../store.js";
import { subCount } from "../store.js";
import { subItem } from "../store.js";
import "./../style/Cart.css";
import { Button } from "react-bootstrap";

function Cart() {
  let state: any = useSelector((state) => {
    return state;
  });
  let dispatch = useDispatch();
  return (
    <div>
      <h3>장바구니</h3>
      <Table>
        <thead>
          <tr>
            <th>상품명</th>
            <th>수량</th>
            <th>가격</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {state.cart.map((a: string, i: number) => {
            return (
              <tr key={i}>
                <td>{state.cart[i].name}</td>
                <td>{state.cart[i].count}</td>
                <td>{state.cart[i].price}</td>
                <td>
                  <button
                    onClick={() => {
                      dispatch(addCount(i));
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => {
                      dispatch(subCount(i));
                    }}
                  >
                    -
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      dispatch(
                        subItem({
                          id: state.cart[i].name,
                          name: state.cart[i].count,
                          price: state.cart[i].price,
                          count: 1,
                        })
                      );
                    }}
                  >
                    x
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Button variant="primary">결제하기</Button>{" "}
    </div>
  );
}

export default Cart;

//해당 상품은 현재 판매 준비중이거나 오픈예정인 상품입니다.
