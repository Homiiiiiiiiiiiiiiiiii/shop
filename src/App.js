import { useEffect, useState } from 'react';
import './App.css';
import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
import data from './data';
import{Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
import Detail from './components/Detail';
import axios from 'axios';
import Cart from './components/Cart';
import { useQuery } from 'react-query';

function App() {

  useEffect(() => {
    let watchedArr = localStorage.getItem('watched')
    if (watchedArr === undefined) {
      localStorage.setItem('watched', JSON.stringify([]))
    }
  },[])

  let [shoes, setShoes] = useState(data);
  const [count, setCount] = useState(1);
  let navigate = useNavigate();

  let result = useQuery('user', () => {
    return axios.get('https://codingapple1.github.io/userdata.json').then((a) => {
      return a.data
    })
  })



  return (
    <div className="App">
      

      <Navbar bg="light" variant='light'>
      <Container>
        <Navbar.Brand onClick={() => {navigate('/')}}>Shop</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={() => {navigate('/')}}>Home</Nav.Link>
          <Nav.Link onClick={() => {navigate('/event')}}>Event</Nav.Link>
          <Nav.Link onClick={() => {navigate('/cart')}}>Cart</Nav.Link>
        </Nav>
        <Nav className='ms-auto'>
          {result.isLoading ? 'Loading' : '반가워요 ' + result.data.name + '님'}
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
      <Link className='item' to={`/detail/${props.shoes.id}`}>
        <img src={"https://codingapple1.github.io/shop/shoes"+(props.num +1 )+".jpg"} alt="신발" width='80%'/>
        <h4>{props.shoes.title}</h4>
        <p>{props.shoes.price}</p>
      </Link>
      </Col>
    </>
  )
}

export default App;
