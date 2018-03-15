import { delay } from "redux-saga";
import { all, call, put, takeEvery } from "redux-saga/effects";
import { fetchRemoteTodos } from "./api-client";
import { fetchTodosFailed, todosLoaded } from "./actionCreators";

export function* helloSaga() {
  console.log("Hello Sagas!");
}

// Our worker Saga: will perform the async increment task
export function* incrementAsync() {
  yield delay(1000);
  yield put({ type: "INCREMENT" });
}

export function* fetchTodos() {
  console.log("Fetching todos");

  try {
    const response = yield call(fetchRemoteTodos);
    yield put(todosLoaded(response));
  } catch (e) {
    console.log("Fetch failed!!!");
    yield put(fetchTodosFailed(e));
    return;
  }

}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchIncrementAsync() {
  yield takeEvery("INCREMENT_ASYNC", incrementAsync);
}

export function* watchFetchTodos() {
  yield takeEvery("FETCH_TODOS", fetchTodos);
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([helloSaga(), watchIncrementAsync(), watchFetchTodos()]);
}
