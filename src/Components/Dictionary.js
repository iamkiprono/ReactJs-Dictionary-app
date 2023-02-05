import React from "react";
import "../Components/Dictionary.css";
import { useState } from "react";

const Dictionary = () => {
  const [word, setWord] = useState();
  const [realWord, setRealWord] = useState("a");
  const [phonetic, setPhonetic] = useState("kJD:j//");
  const [posp, setPosp] = useState("adj");
  const [meaning1, setMeaning1] = useState("Meaning 1");
  const [meaning2, setMeaning2] = useState("Meaning 2");
  const [meaning3, setMeaning3] = useState("Meaning 3");

  const updateValue = (e) => {
    const value = e.target.value;
    setWord(value);
  };
  const fetchData = () => {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      // fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then((response) =>
        !response ? console.log("Loading") : response.json()
      )
      .then((data) => {
        setRealWord(data[0].word);
        for (let i = 0; i < 2; i++) {
          if (data[0].phonetics[i].text === undefined) {
            continue;
          } else setPhonetic(data[0].phonetics[i].text);
        }

        setPosp(data[0].meanings[0].partOfSpeech);
        setMeaning1(data[0].meanings[0].definitions[0].definition);
        setMeaning2(data[0].meanings[0].definitions[1].definition);
        setMeaning3(data[0].meanings[0].definitions[2].definition);
      });
  };
  return (
    <div className="dictionary">
      <div className="top">
        <h2>Dictionary</h2>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Type in word..."
          onChange={updateValue}
        />
        <button className="search-btn" onClick={fetchData}>
        <i class="fa-sharp fa-solid fa-magnifying-glass"></i>
        </button>
      </div>

      <h1 className="word">{realWord}</h1>
      <p className="pronounce">{phonetic}</p>
      <p className="typeofword">
        <b>{posp}</b>
      </p>
      <p className="meaning">
        <i>Meaning</i>
      </p>
      <div className="meanings one">
        <li>{meaning1}</li>
      </div>
      <div className="meanings two">
        <li>{meaning2}</li>
      </div>
      <div className="meanings three">
        <li>{meaning3}</li>
      </div>
    </div>
  );
};

export default Dictionary;
