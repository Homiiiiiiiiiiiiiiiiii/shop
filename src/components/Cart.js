import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { increase, changeName } from "./../store/userSlice";
import { increase2, decrease, removeItem } from "./../store";

function Cart() {

    let state = useSelector((state) => state)
    let dispatch = useDispatch()

  return (
    <div>
        {state.user.name} {state.user.age}쨜의 장바구니
        <Button onClick={() => {
            dispatch(increase(10))
        }}>버튼</Button>
      <Table>
        <thead>
          <tr>
            <th>NO</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
            {state.cart.map((item, index) => (
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.count}</td>
                    <td>
                        <Button onClick={() => {
                            dispatch(increase2(item.id))
                        }}>+</Button>
                        <Button onClick={() => {
                            dispatch(decrease(item.id))
                        }}>-</Button>
                    </td>
                    <td>
                        <Button onClick={() => {
                            dispatch(removeItem(item.id))
                        }}>삭제</Button>
                    </td>
                    
                </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Cart;
