import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import rootReducer from "../reducers";
import createSagaMiddleware from "redux-saga";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = (getDefaultMiddleware) => {
  let middleware = getDefaultMiddleware({
    thunk: false,
    immutableCheck: false,
    serializableCheck: false,
  }).concat(sagaMiddleware);

  if (process.env.NODE_ENV === "development") {
    middleware = middleware.concat(logger);
  }
  return middleware;
};

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: middleware,
});

export default store;
export const persistor = persistStore(store);
