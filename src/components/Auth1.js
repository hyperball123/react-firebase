import React, { useState } from "react";
import { auth, googleProvider } from "../config/firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

function Auth1() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(auth?.currentUser?.email);
  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  };

  async function signInWithGoogle() {
    try {   
      await signInWithPopup(auth, googleProvider);
      console.log("Sign in with Google successful.");
      // Close the popup after successful sign-in
      //  window.location.href = "/confirmation.html";
    } catch (err) {
      console.error(err);
    }
  }

  async function logout() {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Email..."
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password..."
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signIn}>Sign in</button>

      <button onClick={signInWithGoogle}>Sign in with Google</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Auth1;
