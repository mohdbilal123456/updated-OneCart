import React, { useContext, useState, useRef } from 'react';
import ai from "../assets/ai.png";
import { shopDataContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import open from "../assets/open.mp3";

function Ai() {
  const { showSearch, setShowSearch } = useContext(shopDataContext);
  const navigate = useNavigate();
  const [activeAi, setActiveAi] = useState(false);
  const openingSound = useRef(new Audio(open));

  const speak = (message) => {
    const utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
  };

  const startRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error("Speech Recognition not supported!");
      return;
    }

    // create new recognition every click
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setActiveAi(true);
      openingSound.current.play().catch(() => {});
    };

    recognition.onend = () => {
      setActiveAi(false);
    };

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript.trim().toLowerCase();
      console.log("Transcript:", transcript);

      if (transcript.includes("search") && transcript.includes("open") && !showSearch) {
        speak("opening search");
        setShowSearch(true);
        navigate("/collection");
      } else if (transcript.includes("search") && transcript.includes("close") && showSearch) {
        speak("closing search");
        setShowSearch(false);
      } else if (transcript.includes("collection") || transcript.includes("product")) {
        speak("opening collection page");
        navigate("/collections");
        setShowSearch(false);
      } else if (transcript.includes("about")) {
        speak("opening about page");
        navigate("/about");
        setShowSearch(false);
      } else if (transcript.includes("home")) {
        speak("opening home page");
        navigate("/");
        setShowSearch(false);
      } else if (transcript.includes("cart")) {
        speak("opening your cart");
        navigate("/carts");
        setShowSearch(false);
      } else if (transcript.includes("contact")) {
        speak("opening contact page");
        navigate("/contact");
        setShowSearch(false);
      } else if (transcript.includes("order")) {
        speak("opening your orders page");
        navigate("/order");
        setShowSearch(false);
      } else {
        toast.error("Try Again");
      }
    };

    try {
      recognition.start(); // start mic on every click
    } catch (err) {
      console.error("Error starting recognition:", err);
      toast.error("Microphone access denied or not available");
    }
  };

  return (
    <div
      className='fixed lg:bottom-[20px] md:bottom-[40px] z-[999] bottom-[80px] left-[2%]'
      onClick={startRecognition}
    >
      <img
        src={ai}
        alt="AI Assistant"
        className={`w-[100px] cursor-pointer transition-transform duration-300 ${
          activeAi ? 'translate-x-[10%] translate-y-[-10%] scale-125' : 'translate-x-[0] translate-y-[0] scale-100'
        }`}
        style={{
          filter: activeAi ? "drop-shadow(0px 0px 30px #00d2fc)" : "drop-shadow(0px 0px 20px black)"
        }}
      />
    </div>
  );
}

export default Ai;
