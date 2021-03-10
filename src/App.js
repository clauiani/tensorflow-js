import "./App.css";
import * as tf from "@tensorflow/tfjs";
import * as speech from "@tensorflow-models/speech-commands";

import React, { useEffect, useState } from "react";

const App = () => {
  const [model, setModel] = useState(null);
  const [action, setAction] = useState(null);
  const [labels, setLabels] = useState(null);

  const loadModel = async () => {
    const recognizer = await speech.create("BROWSER_FFT");
    console.log("Aplicatie pornita");
    await recognizer.ensureModelLoaded();
    console.log(recognizer.wordLabels());
    setModel(recognizer);
    setLabels(recognizer.wordLabels());
  };
  useEffect(() => {
    loadModel();
  }, []);

  function argMax(arr) {
    return arr.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
  }
  const recognizeCommands = async () => {
    console.log("Se aculta pentru comenzi");
    model.listen(
      (result) => {
        console.log(result);
        setAction(labels[argMax(Object.values(result.scores))]);
      },
      { includeSpectrogram: true, probabilityThreshold: 0.7 }
    );
    setTimeout(() => model.stopListening(), 10e3);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>Microfon</div>
        <div>
          Pueti alege din urmatoarele:
          <ul className="list">
            <li>Down</li>
            <li>Up</li>
            <li>Left</li>
            <li>Right</li>
            <li>Go</li>
            <li>No</li>
            <li>Yes</li>
            <li>Stop</li>
            <li>Zero</li>
            <li>One</li>
            <li>Two</li>
            <li>Three</li>
            <li>Four</li>
            <li>Five</li>
            <li>Six</li>
            <li>Seven</li>
            <li>Eight</li>
            <li>Nine</li>
          </ul>
        </div>

        <button onClick={recognizeCommands}>Asculta</button>
        {action ? <div>{action}</div> : <div>Nici-o actiune</div>}
      </header>
    </div>
  );
};

export default App;
