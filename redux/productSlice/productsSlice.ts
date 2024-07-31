import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface productState {
  items: []
}
const initialState: productState = {
  items:[],
}

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers:{
        getProducts: (state, action:PayloadAction<[]>)=>{
            state.items = action.payload;
        }
    }
})

export const  {getProducts} = productsSlice.actions;
export default productsSlice.reducer;