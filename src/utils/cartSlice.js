import {createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
    },
    reducers: {
        addItem: (state, action) => {
            const existing = state.items.find((item) => item.id === action.payload.id);
            if (existing) {
                existing.quantity = (existing.quantity ?? 1) + 1;
                return;
            }
            state.items.push({ ...action.payload, quantity: 1 });
        },
        increaseItem: (state, action) => {
            const item = state.items[action.payload];
            if (item) item.quantity = (item.quantity ?? 1) + 1;
        },
        decreaseItem: (state, action) => {
            const item = state.items[action.payload];
            if (!item) return;
            if ((item.quantity ?? 1) > 1) {
                item.quantity -= 1;
                return;
            }
            state.items.splice(action.payload, 1);
        },
        removeItem: (state, action) => {
            state.items.splice(action.payload, 1);
        },
        clearItem: (state) => {
           state.items.length = 0;
        }
    }
});

export const { addItem, increaseItem, decreaseItem, removeItem, clearItem } = cartSlice.actions;

export default cartSlice.reducer;