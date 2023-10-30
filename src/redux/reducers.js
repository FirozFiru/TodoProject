import {createSlice, createSelector} from '@reduxjs/toolkit';


const slice = createSlice({
    name: 'todoList',
    initialState: {
        todoLists: [],
        isDark: false
    },
    reducers: {
        setAddListItem(state, action) {
            state.todoLists.push(action.payload)
        },
        setDeleteItem(state, action) {
            const updatedItems = state.todoLists.filter(item => item.id !== action.payload);
            state.todoLists = [...updatedItems]
        },
        setUpdateListItem(state, action) {
            const {id, updatedItem} = action.payload
            const index = state.todoLists.findIndex(item => item.id === id);
            state.todoLists[index] = {...updatedItem};
        },
        setTheme(state, action) {
            state.isDark = action.payload
        }
    }
});

export const {setAddListItem, setDeleteItem, setUpdateListItem, setTheme} = slice.actions;
export default slice.reducer;

const selectState = state => state
export const selectAllTodoListItems = createSelector(selectState,
    state => state.todoLists
    )

export const selectDarkTheme = createSelector(
    selectState,
    state => state.isDark
)