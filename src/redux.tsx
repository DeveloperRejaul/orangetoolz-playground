import { configureStore} from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import createSagaMiddleware from 'redux-saga'
import { all, put, takeEvery, call } from 'redux-saga/effects'
import { api } from './api'


/**=============================================================
 *                       setup slice
 *=============================================================*/
interface CounterState {
  value: number
}

const initialState: CounterState = {
  value: 0,
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state, action) => {
      console.log(action);
      state.value += 1
    },
    decrement: (state, action) => {
      console.log(action);
      state.value -= 1
    },
  },
})
export const {decrement, increment} = counterSlice.actions


// slice2 for api call 
interface UserState {
  isLoading: boolean;
    isError: boolean;
    error: null | string;
    data: [{}];
}
const initialStateUser:UserState = {
  isLoading: false,
  isError: false,
  error: null,
  data: [{}]
}

const userSlice = createSlice({
  name:"user",
  initialState: initialStateUser,
  reducers:{
    getUser: (state, action) => {
      console.log(action);
      state.isLoading = true;
    },
    getSuccdssUser: (state, action) => {
      state.isLoading = false;
      state.data = action.payload
    },
    getFaildUser: (state, action) => {
      console.log(action);
      state.error = "Error message";
      state.isError = true;
      state.isLoading = false;
    },
  },
})

/**=============================================================
 *                       sega fn
 *=============================================================*/
const sagaMiddleware = createSagaMiddleware()
const delay = (ms:number) => new Promise(res => setTimeout(res, ms))

// Our worker Saga: will perform the async increment task
function* incrementAsync(value:any) {
    console.log(value);
    yield delay(5000)
    yield put({ type: 'counter/decrement' , payload: "Hello World"})
}

  
// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
function* watchIncrementAsync() {
    yield takeEvery('counter/increment', incrementAsync)
}


// ================== fetch user data saga fn =========================
function* uaerAsync() {
  //@ts-ignore
  const user = yield call(api.getUser, 'users')
  yield put({ type: 'user/getSuccdssUser' , payload: user})
}


// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
function* watchUserAsync() {
  yield takeEvery('user/getUser', uaerAsync)
}

function* rootSaga() {
    yield all([
      watchIncrementAsync(),
      watchUserAsync()
    ])
}

/**=============================================================
 *                       setup store 
 *=============================================================*/

export const store = configureStore({
   reducer: {
    counter: counterSlice.reducer,
    user: userSlice.reducer,
  },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
})
sagaMiddleware.run(rootSaga)


  
// Infer the `RootState` and `AppDispatch` types from the store itself
type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
type AppDispatch = typeof store.dispatch
  
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


