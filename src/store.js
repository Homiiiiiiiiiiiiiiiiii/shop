import { configureStore, createSlice } from "@reduxjs/toolkit"
import user from './store/userSlice.js'

let stock = createSlice({
    name : 'stock',
    initialState : [10,11,12]
})

let cart = createSlice({
    name : 'cart',
    initialState : [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
      ],
    reducers : {
        increase2(state, action){
            let index = state.findIndex((a) => {return a.id === action.payload})
            state[index].count++
        },
        addItem(state, action){
            let index = state.findIndex((a) => {return a.name ===  action.payload})
            if (index === -1) {
                state.push({id : state.length+1, name: action.payload, count: 1})
            }else{
                state[index].count++    
            }
        },
        decrease(state, action){
            let index = state.findIndex((a) => {return a.id === action.payload})
            if(state[index].count > 0){
                state[index].count = state[index].count-1
            }
        },
        removeItem(state, action){
            let index = state.findIndex((a) => {return a.id === action.payload})
            state.splice(index,1)
        }
    }
})

export let {increase2, addItem, decrease, removeItem} = cart.actions

export default configureStore({
    reducer: {
        user : user.reducer,
        stock : stock.reducer,
        cart : cart.reducer
    }
})