import {
    GET_LIST,
    GET_LIST_SUCCESS,
    FILTER_WITH_CATEGORY,
    FILTER_WITH_LABEL,
    FILTER_WITH_STATUS,
    ADD_NEW_ITEM,
    MARK_ALL_ITEMS,
    REMOVE_ITEM,
    SELECTED_ITEM,
} from '../constants/actionTypes';

import Todos from '../data/todos.json'

export const getTodoList = () => ({
    type: GET_LIST
});

export const getTodoListSuccess = (items) => ({
    type: GET_LIST_SUCCESS,
    payload: items
});

export const getList = () => dispatch => {
    dispatch(getTodoList());
    const items = Todos.data;
    dispatch(getTodoListSuccess(items));
}

export const filterWithCategory = (category) => ({
    type: FILTER_WITH_CATEGORY,
    payload: category
});

export const filterWithLabel = (label) => ({
    type: FILTER_WITH_LABEL,
    payload: label
});

export const filterWithStatus = (status) => ({
    type: FILTER_WITH_STATUS,
    payload: status
});

export const addNewItem = (task, category, label, color) => ({
    type: ADD_NEW_ITEM,
    payload: {task, category, label, color}
});

export const removeItem = (itemId) => ({
    type: REMOVE_ITEM,
    payload: itemId
});

export const selectedItem = (itemId, status) => ({
    type: SELECTED_ITEM,
    payload: {itemId, status}
});

export const markAllItems = (status) => ({
    type: MARK_ALL_ITEMS,
    payload: status
});


