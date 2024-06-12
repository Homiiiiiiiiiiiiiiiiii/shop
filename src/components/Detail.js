import { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addItem } from "../store";


function Detail(props){
    const [event, setEvent] = useState(true)
    const [tab, setTab] = useState(0)
    const [fade, setFade] = useState('')
    const dispatch = useDispatch()
    useEffect(() => {
        setTimeout(()=> { setEvent(false)},2000);
        setTimeout(()=> { setFade('end')},100);
    },[])
    
    let {id} = useParams();
    let shoe = props.shoes.find((item) => item.id == id);
    return(
        <div className={'container start ' + fade}>
            {
                event ? <div className="alert alert-warning"> 2초이내 구매시 할인</div> : null
            }
            <div className="row">
                <div className="col-md-6">
                <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
                </div>
                <div className="col-md-6 mt-4">
                <h4 className="pt-5">{shoe.title}</h4>
                <p>{shoe.content}</p>
                <p>{shoe.price}원</p>
                <button className="btn btn-danger" onClick={() => {
                    dispatch(addItem(shoe.title))
                }}>주문하기</button>
                </div>
            </div>

            <Nav variant="tabs"  defaultActiveKey="link0">
                <Nav.Item>
                <Nav.Link onClick={() => setTab(0)} eventKey="link0">버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link onClick={() => setTab(1)} eventKey="link1">버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link onClick={() => setTab(2)} eventKey="link2">버튼2</Nav.Link>
                </Nav.Item>
            </Nav>
            <TabContent tab={tab} />

        </div>
    )
}

function TabContent({tab }){

    const [fade, setFade] = useState('')

    useEffect(() => {
        setTimeout(() => { setFade('end') },100) //시간차 공격! auto머시기 밴칭때문에 한번에 렌더링됨
        
        return () => { //clean up
            setFade('')
        }
    },[tab])

    return <div className={'start ' + fade}>
        {[<div>냥냥냥0</div>,<div>냥냥냥1</div>,<div>냥냥냥2</div>][tab]}
    </div>
}

export default Detail;