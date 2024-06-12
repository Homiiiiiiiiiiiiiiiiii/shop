import { useState } from 'react';
import './App.css';
import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
import data from './data';
import{Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
import Detail from './components/Detail';
import axios from 'axios';
import Cart from './components/Cart';

function App() {

  let [shoes, setShoes] = useState(data);
  const [count, setCount] = useState(1);
  let navigate = useNavigate();

  return (
    <div className="App">
      

      <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">Shop</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={() => {navigate('/')}}>Home</Nav.Link>
          <Nav.Link onClick={() => {navigate('/detail')}}>Detail</Nav.Link>
          <Nav.Link onClick={() => {navigate('/event')}}>Event</Nav.Link>
          <Nav.Link onClick={() => {navigate('/cart')}}>Cart</Nav.Link>
        </Nav>
      </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={
            <>
            <div className='main-bg'></div>
            <Container>
            <Row>
              {shoes.map((item, index) => (
                <Card shoes={item} num={index} key={index}/>
              ))}
              {/* <Col>
                <img src="https://codingapple1.github.io/shop/shoes2.jpg" alt="" width='80%'/>
                <h4>{shoes[1].title}</h4>
                <p>{shoes[1].price}</p>
              </Col>
              <Col>
                <img src="https://codingapple1.github.io/shop/shoes3.jpg" alt="" width='80%'/>
                <h4>{shoes[2].title}</h4>
                <p>{shoes[2].price}</p>
              </Col> */}
            </Row>
          </Container>
          {
            count < 3 
            ? <button onClick={() => {
              axios.get('https://codingapple1.github.io/shop/data2.json')
              .then((res) => {
                let copy = [...shoes, ...res.data];
                setShoes(copy)
                setCount(count+1)
                console.log(count)
              })
              .catch(() => {
                console.log("ERROR");
              })
            }}>더보기</button>
            : null
          }
          
          </>
        }/>
        <Route path="/detail/:id" element={<Detail shoes={shoes} />}/>
        <Route path="/event" element={<Event></Event>}>
          <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>}/>
          <Route path="two" element={<div>생일기념 쿠폰받기</div>}/>
        </Route>
        <Route path="*" element={<div>404 ERROR</div>}/>
        <Route />
        <Route path="/cart" element={ <Cart /> }/>
      </Routes>

    </div>
  );
}

function Event(){
  return(
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
}


function Card(props){
  return(
    <>
      <Col xs={6} md={4}>
        <img src={"https://codingapple1.github.io/shop/shoes"+(props.num +1 )+".jpg"} alt="신발" width='80%'/>
        <h4>{props.shoes.title}</h4>
        <p>{props.shoes.price}</p>
      </Col>
    </>
  )
}

export default App;
