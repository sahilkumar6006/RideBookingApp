import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    id: string;
    fullName: string;
    email: string;
    profileImage: string;
    address: string;
    street: string;
    district: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    isAuthenticated: boolean;
}

const initialState: UserState = {
    id: '',
    fullName: '',
    email: '',
    profileImage: '',
    address: '',
    street: '',
    district: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    isAuthenticated: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<Partial<UserState>>) => {
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
            };
        },
        updateProfile: (state, action: PayloadAction<Partial<UserState>>) => {
            return {
                ...state,
                ...action.payload,
            };
        },
        clearUser: () => {
            return initialState;
        },
    },
});

export const { setUser, updateProfile, clearUser } = userSlice.actions;
export default userSlice.reducer;
