import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const status = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading'
})


const initialState = {
data: [],
status: status.IDLE,
};
const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers:{
    //     setProducts(state,action){
    //         state.data = action.payload
    //     },
    //     setStatus(state,action){
    //     state.status = action.payload
    //     },
        extraReducers: (builder)=>{
            builder
            .addCase(fetchProducts.pending, (state, action)=>{
                state.status = status.LOADING
            })
            .addCase(fetchProducts.fulfilled, (state, action)=>{
                state.data = action.payload
                state.status = status.IDLE
            })
            .addCase(fetchProducts.rejected, (state, action)=>{
                state.status = status.ERROR
            })
        }
       
    }

})

export const {setProducts,setStatus} = productSlice.actions;
export default productSlice.reducer;


// Thunks

export const fetchProducts = createAsyncThunk('products/fetch', async ()=>{
    const res = await fetch('https://fakestoreapi.com/products');
            const data = await res.json()
            return data
})






// export function fetchProducts(){
//     return async function fetchProductThunk(dispatch,getstate){
//         dispatch(setStatus(status.LOADING))
//         try {
//             const res = await fetch('https://fakestoreapi.com/products');
//             const data = await res.json()
//             dispatch(setProducts(data))
//             dispatch(setStatus(status.IDLE))
//         } catch (error) {
//             console.log(error);
            
//             dispatch(setStatus(status.ERROR))
//         }
//     }
// }