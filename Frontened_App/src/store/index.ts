// src/store/index.ts
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { combineReducers } from 'redux';

// Define action types
const TOGGLE_MODAL = 'TOGGLE_MODAL';

// Define action creators
export const toggleModal = () => ({
    type: TOGGLE_MODAL,
});

// Define the initial state
const initialState = {
    isModalVisible: false,
};

// Create a reducer
const modalReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case TOGGLE_MODAL:
            return { ...state, isModalVisible: !state.isModalVisible };
        default:
            return state;
    }
};

// Combine reducers (if you have more than one)
const rootReducer = combineReducers({
    modal: modalReducer,
});

// Set up persistence
const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store
const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };