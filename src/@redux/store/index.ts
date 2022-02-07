import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { rootReducer } from "@redux/reducers";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "profile"],
};

const middlewares = [thunk];
const appliedMiddlewares = applyMiddleware(...middlewares);
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, appliedMiddlewares);
const persistor = persistStore(store);

export { store, persistor };
