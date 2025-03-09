'use client';
import React, { useState, useEffect } from 'react';
import styles from './page.module.css'; // ✅ Corrected CSS import
import { List } from 'react-virtualized';
import { GiCrossMark } from "react-icons/gi";

function Page() {
    const [text, setText] = useState('');
    const [response, setResponse] = useState('');
    const [message, setMessage] = useState('');
    const [list, setList] = useState([]);
    const [reclassifiedData, setReclassifiedData] = useState([]);
    const [width, setWidth] = useState(300);
    const [height, setHeight] = useState(400);
    const [showAlert, setShowAlert] = useState(false);
    const [cyberbullyCount, setCyberbullyCount] = useState(0); // Counter to track cyberbullying messages

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth * 0.9);
            setHeight(window.innerHeight * 0.5);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        console.log("useEffect triggered");
    
        const fetchData = async () => {
          try {
            const res = await fetch("https://springmajor.onrender.com/api/post/get");
            const data = await res.json();
            console.log("data",data)
            console.log("Fetched data:", data);
            setReclassifiedData(data);
          } catch (error) {
            console.error("Error Fetching Data:", error);
          }
        };
    
        fetchData();
      }, []);

    const handleChange = (e) => setText(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Convert input text to lowercase for case-insensitive comparison
        const lowerCaseInput = text.toLowerCase();
    
        // Find if any part of the input text matches a previously classified phrase
        const foundEntry = reclassifiedData.find((item) =>
            lowerCaseInput.includes(item.text.toLowerCase())
        );
    
        if (foundEntry) {
            // If a match is found, use the stored label
            console.log("Matched classified text:", foundEntry.text);
            console.log("Assigned Label:", foundEntry.label);
            setResponse(foundEntry.label);
    
            if (foundEntry.label === 'Not Cyberbullying') {
                setMessage('Good to go');
                setList((prevList) => [...prevList, text]);
            } else {
                setMessage('Cyberbullying detected');
                setCyberbullyCount(prevCount => {
                    const newCount = prevCount + 1;
                    if (newCount === 3) {
                        setMessage("Reported"); // Change message after 3 detections
                        alert("3 Cyberbullying messages detected! Generating report...");
                    }
                    return newCount;
                });
                setShowAlert(true);
            }
        } else {
            // If no match, send the request to localhost:5000/predict
            try {
                const res = await fetch(`http://localhost:5000/predict`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ text }),
                });
    
                const data = await res.json();
                setResponse(data.prediction);
    
                if (data.prediction === 'Not Cyberbullying') {
                    setMessage('Good to go');
                    setList((prevList) => [...prevList, text]);
                } else {
                    setMessage('Cyberbullying detected');
                    setCyberbullyCount(prevCount => {
                        const newCount = prevCount + 1;
                        if (newCount === 3) {
                            setMessage("Reported"); // Change message after 3 detections
                            alert("3 Cyberbullying messages detected! Generating report...");
                        }
                        return newCount;
                    });
                    setShowAlert(true);
                }
            } catch (error) {
                console.error('Error:', error);
                setResponse('Error processing request');
            }
        }
    
        setText('');
    };
    

    const rowRenderer = ({ index, key, style }) => (
        <div key={key} style={{ ...style, padding: 10, borderBottom: '1px solid #eee' }}>
            {list[index]}
        </div>
    );

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Send a Message</h1>

            <div className={styles.chatContainer}>
                <div className={styles.listContainer}>
                    <List
                        width={width}
                        height={height}
                        rowHeight={50}
                        rowCount={list.length}
                        rowRenderer={rowRenderer}
                    />
                </div>

                {/* Alert Modal */}
                {showAlert && (
                    <div className={styles.alertModal}>
                        <button 
                            className={styles.closeAlertButton} 
                            onClick={() => setShowAlert(false)}
                        >
                            <GiCrossMark style={{ fontSize: "24px" }} />
                        </button>
                        <p style={{marginTop: 30}}>🚨 Cyberbullying detected!</p>
                        <h1>{response}</h1>
                        <button
                            onClick={() => setShowAlert(false)}
                            className={styles.alertButton}
                        >
                            {cyberbullyCount >= 3 ? "Reported" : "You can't send any abusing messages!!"}
                        </button>
                    </div>
                )}

                {/* Message Input Area */}
                <div className={styles.formContainer}>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.inputGroup}>
                            <input
                                type="text"
                                className={styles.formControl}
                                placeholder="Type your message"
                                value={text}
                                onChange={handleChange}
                            />
                            <button className={styles.sendButton} type="submit">
                                Send
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Page;
