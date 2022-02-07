import React from "react";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "@redux/store";
import ThemeProvider from "ThemeProvider";
import "@firebase";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <ThemeProvider />
      </PersistGate>
    </Provider>
  );
};

export default App;
