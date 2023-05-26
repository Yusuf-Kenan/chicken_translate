/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLanguages, getResponse } from "../app/translate-state";
import Select from "react-select";

export default function MainPage() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [prompt, setPrompt] = useState("");
  const [sourceLang, setSourceLang] = useState({
    value: "tr",
    label: "Turkish",
  });
  const [targetLang, setTargetLang] = useState({
    value: "en",
    label: "English",
  });

  useEffect(() => {
    dispatch(getLanguages());
  }, []);

  const handleClick = () => {
    dispatch(getResponse({prompt, sourceLang, targetLang}));
  };

  return (
    <>
      <h1>Chicken Translate</h1>
      <div className="container">
        <div className="left">
          <Select
            value={sourceLang}
            onChange={(e) => {
              setSourceLang(e);
            }}
            options={state.languages}
          />
          <textarea type="text" onChange={(e) => setPrompt(e.target.value)} />
        </div>
        <div className="right">
          <Select
            value={targetLang}
            onChange={(e) => {
              setTargetLang(e);
            }}
            options={state.languages}
          />
          <textarea className={state.isLoading && "loading"} value={state.response} type="text" />
        </div>
      </div>
      <button onClick={handleClick}>TRANSLATE</button>
    </>
  );
}
