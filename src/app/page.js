'use client'

import Image from "next/image";
import { useRouter, useEffect,useState } from "next/navigation";
import "./page.css"

export default function Home() {
  const router = useRouter()
  function homepage() {
    router.push("/machineModel")
  }

  

  return (

    <div className="mainContainer">
      <div className="topic">
        <div className="topicRow">
          <h1 className="topic__h1">CyberBullying Detection</h1>

        </div>
        <div className="topic__h2">
          <h2>using machine learning</h2>
        </div>
        <div className="buttonContainer">
          <button onClick={homepage}>Test the Model</button>
        </div>
      </div>

    </div >
  );
}