// App.jsx ✅
import { Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import SignInPage from "./pages/SignIn";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <SignedIn>
              <Navigate to="/home" />
            </SignedIn>
            <SignedOut>
              <Navigate to="/sign-in" />
            </SignedOut>
          </>
        }
      />

      <Route path="/sign-in" element={<SignInPage />} />
      <Route
        path="/home"
        element={
          <>
            <SignedIn>
              <Home />
            </SignedIn>
            <SignedOut>
              <Navigate to="/sign-in" />
            </SignedOut>
          </>
        }
      />
    </Routes>
  );
}

export default App;
