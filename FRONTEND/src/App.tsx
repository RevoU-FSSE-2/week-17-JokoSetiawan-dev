import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "../src/pages";
import { MainLayout } from "./layout";
import React from "react";
import NewTransaction from "./components/NewTransactionForm";
import EditTransaction from "./components/EditTransaction";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <HomePage data={[]} />
            </MainLayout>
          }
        />
        <Route path="/newtransaction" element={<NewTransaction />} />
        <Route path="/transaction/update" element={<EditTransaction />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
