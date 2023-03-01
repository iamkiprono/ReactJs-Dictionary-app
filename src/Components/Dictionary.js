import React from "react";
import "../Components/Dictionary.css";
import { useState } from "react";
import Spinner from "./Spinner";

const Dictionary = () => {
  const [word, setWord] = useState();
  const [realWord, setRealWord] = useState("a");
  const [phonetic, setPhonetic] = useState("kJD:j//");
  const [posp, setPosp] = useState("adj");
  const [meaning1, setMeaning1] = useState("Meaning 1");
  const [meaning2, setMeaning2] = useState("Meaning 2");
  const [meaning3, setMeaning3] = useState("Meaning 3");
  const [loading, setLoading] = useState(true);

  const updateValue = (e) => {
    const value = e.target.value;
    setWord(value);
  };
  const fetchData = (e) => {
    e.preventDefault();
    setMeaning1("");
    setMeaning2("");
    setMeaning3("");
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      // fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then((response) => response.json())

      .then((data) => {
        console.log(data);
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
      }).catch(err => {
        setMeaning1("Word not found")
        setMeaning2("Word not found")
        setMeaning3("Word not found")
      });
  };
  return (
    <div className="dictionary">
      <div className="top">
        <h2>Dictionary</h2>
      </div>
      <form>
        <div className="search-bar">
          <input
            required
            type="text"
            placeholder="Type in word..."
            onChange={updateValue}
          />
          <button type="submit" className="search-btn" onClick={fetchData}>
            <i class="fa-sharp fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </form>

      <h1 className="word">{realWord}</h1>
      <p className="pronounce">{phonetic}</p>
      <p className="typeofword">
        <b>{posp}</b>
      </p>
      <p className="meaning">
        <i>Meaning</i>
      </p>
      <div className="meanings one">
        <li>{meaning1 ? meaning1 : <Spinner />}</li>
      </div>
      <div className="meanings two">
        <li>{meaning2 ? meaning2 : <Spinner/>}</li>
      </div>
      <div className="meanings three">
        <li>{meaning3 ? meaning3 : <Spinner/>}</li>
      </div>
    </div>
  );
};

export default Dictionary;
