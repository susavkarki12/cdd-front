'use client';
import React, { useState, useEffect } from "react";
import styles from "./page.module.css"; // ✅ Correct Import
import { GiCrossMark } from "react-icons/gi";

function Page() {
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  const [reclassifiedData, setReclassifiedData] = useState([]);
  const [showLabelDialog, setShowLabelDialog] = useState(false); // Controls Label Selection Dialog

  useEffect(() => {
    console.log("useEffect triggered");

    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/post/get");
        const data = await res.json();
        console.log("Fetched data:", data);
        setReclassifiedData(data);
      } catch (error) {
        console.error("Error Fetching Data:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    if (response) {
      setShowLabelDialog(false);
    }
  }, [response]); // Only run when 'response' changes
  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:5000/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      setResponse(data.prediction);
    } catch (error) {
      console.error("Error:", error);
      setResponse("Error processing request");
    }
  };

  const changeLabel = async () => {
    setResponse("")
    setShowLabelDialog(true);
  }


  const handleLabelSelect = async (label) => {
    console.log("Selected Label:", label);
    const userData = {
      text: text,
      label: label
    }
    try {
      const res = await fetch(`https://springmajor.onrender.com//api/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData)
      })

      if (!res.ok) {
        throw new Error("Failed to Post Data")
      }
      setShowLabelDialog(false); // Close dialog after selection

    } catch (error) {
      console.log("Error", error)
    }
  };

  return (
    <div className={styles.container}>  {/* ✅ Use styles from CSS Module */}
      <div style={{ marginTop: 120 }}>
        <h1 className={styles.heading}>Cyberbullying Detection</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Enter text"
            value={text}
            onChange={handleChange}
            className={styles.input}
          />
          <button type="submit" className={styles.button}>Analyze</button>
        </form>
        {response && (
          <div className={styles.predictionDialog}>
            <button
              className={styles.closeAlertButton}
              onClick={() => setResponse(false)}
            >
              <GiCrossMark style={{ fontSize: "24px" }} />
            </button>
            <h2 className={styles.predictionHeading}>Prediction:</h2>
            <p className={styles.predictionText}>{response}</p>
            <button className={styles.closeButton} onClick={changeLabel}>
              Wrong Label? Change it
            </button>
          </div>
        )}

        {/* Label Selection Dialog Box */}
        {showLabelDialog && (
          <div className={styles.labelDialog}>
            <button
              className={styles.closeAlertButton}
              onClick={() => setShowLabelDialog(false)}
            >
              <GiCrossMark style={{ fontSize: "24px" }} />
            </button>
            <h3>Select Correct Label:</h3>
            <button className={styles.labelButton} onClick={() => handleLabelSelect("Not Cyberbullying")}>Not Cyberbullying</button>
            <button className={styles.labelButton} onClick={() => handleLabelSelect("Gender/Sexual")}>Gender/Sexual</button>
            <button className={styles.labelButton} onClick={() => handleLabelSelect("Age")}>Age</button>
            <button className={styles.labelButton} onClick={() => handleLabelSelect("Ethnicity/Race")}>Ethnicity/Race</button>
            <button className={styles.labelButton} onClick={() => handleLabelSelect("Religion")}>Religion</button>

          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
