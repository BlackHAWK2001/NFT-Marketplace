import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    activeCategory: 'Info',
    data: [
        { id: 1, category: 'Info', avatar: 'avatar1.jpg', name: 'Raquel Will', assignment: 'Owner' },
        { id: 2, category: 'Owners', avatar: 'avatar2.jpg', name: 'Selina Mayert', assignment: 'Owner' },
        { id: 2, category: 'Owners', avatar: 'avatar2.jpg', name: 'Selina Mayert', assignment: 'Creator' },
        { id: 3, category: 'History', avatar: 'avatar3.jpg', name: 'HISTORY', assignment: 'Historian' },
        { id: 4, category: 'Bids', avatar: 'avatar4.jpg', name: 'Anna Black', assignment: 'Bidder' },
    ],
};

const peopleSlice = createSlice({
    name: 'people',
    initialState,
    reducers: {
        setCategory: (state, action) => {
            state.activeCategory = action.payload;
        },
    },
});

export const { setCategory } = peopleSlice.actions;
export default peopleSlice.reducer;
