import React from "react";
import NavBar from "./auth/components/NavBar";
import "./index.css";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import AddCard from "./Gojo/AddCard";
import CreateAccount from "./auth/createAccount/CreateAccount";
import {
  getStorage,
  ref as ref1,
  uploadBytes,
  listAll,
  getDownloadURL,
} from "firebase/storage";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
import Bidding from "./Gojo/Bidding";
import LandingPage from "./auth/LandingPage";
import Home from "./Gojo/Home";
import PlaceBid from "./Gojo/PlaceBid";
import { Route, Router, Routes } from "react-router";
import Review from "./Gojo/Review";
import RegisterAccount from "./auth/createAccount/RegisterAccount";
import EmailVerify from "./auth/login/EmailVerify";
import LoginAccount from "./auth/login/LoginAccount";
import SelectInterest from "./auth/createAccount/SelectIntrest";
import ChatB from "./socialModule/ChatB";
import FriendRecomdataion from "./socialModule/FriendsRecomdationWithNav";
import NotificationInNav from "./socialModule/NotificationInNav";
import SocialProfileSimple from "./socialModule/SeeFriendsInDetail";
import SidebarWithHeader from "./HomePage";

const firebaseConfig = {
  apiKey: "AIzaSyBaGEpnwQf01FPH_3FDz8HiKrrFUD6h-lU",
  authDomain: "hackathon-80b62.firebaseapp.com",
  projectId: "hackathon-80b62",
  storageBucket: "hackathon-80b62.appspot.com",
  messagingSenderId: "105991838384",
  appId: "1:105991838384:web:bae08d8e166691b927f975",
  measurementId: "G-H78SJEQ11E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);
const storage = getStorage(app);

export async function read(path) {
  return new Promise((res, rej) => {
    onValue(ref(db, path), (snap) => {
      res(snap.val());
    });
  });
}

function App() {
  return (
    <>

      <Routes>
        <Route path="/rev" element={<Review />} />
        <Route path="/products/:postid" element={<PlaceBid db={db} />} />
        <Route path="/Add" element={<AddCard db={db} storage={storage} />} />
        <Route path="/home" element={<SidebarWithHeader db={db} s={storage} />} />
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/createAccount" element={<CreateAccount />} />
          <Route path="/reg" element={<RegisterAccount />} />
          <Route path="/verify" element={<EmailVerify />} />
          <Route path="/login" element={<LoginAccount />} />
          <Route path="/post" element={<ChatB />} />
          <Route path="/fr" element={<FriendRecomdataion />} />
          <Route path="/noti" element={<NotificationInNav />} />
          <Route path="/seeFri" element={<SocialProfileSimple />} />
        </Routes>

    </>
  );
}

export default App;
