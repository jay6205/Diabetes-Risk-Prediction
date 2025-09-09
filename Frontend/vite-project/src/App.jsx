import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Form from "./components/Form";

function App() {
  return (
    <>
      <main className="min-h-screen bg-background p-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Diabetes Prediction App
            </h1>
            <p className="text-muted-foreground">
              Enter your health metrics to get a diabetes risk assessment
            </p>
          </div>
          <Form />
        </div>
      </main>
    </>
  );
}

export default App;
