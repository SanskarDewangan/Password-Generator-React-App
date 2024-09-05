import React, { useState, useEffect } from 'react';
import './App.css'

const App = () => {
  const [length, setLength] = useState(16);
  const [hasUppercase, setHasUppercase] = useState(true);
  const [hasLowercase, setHasLowercase] = useState(true);
  const [hasNumber, setHasNumber] = useState(true);
  const [hasSymbol, setHasSymbol] = useState(false);
  const [password, setPassword] = useState("CLICK GENERATE");
  const [copied, setCopied] = useState(false);

  const sliderProps = {
    fill: "#0B1EDF",
    background: "rgba(255, 255, 255, 0.214)",
  };

  useEffect(() => {
    applyFill(document.getElementById("slider"));
  }, [length]);

  const applyFill = (slider) => {
    const percentage = (100 * (slider.value - slider.min)) / (slider.max - slider.min);
    const bg = `linear-gradient(90deg, ${sliderProps.fill} ${percentage}%, ${sliderProps.background} ${percentage + 0.1}%)`;
    slider.style.background = bg;
  };

  const generatePassword = () => {
    const randomFunc = {
      lower: getRandomLower,
      upper: getRandomUpper,
      number: getRandomNumber,
      symbol: getRandomSymbol,
    };

    let generatedPassword = '';
    const typesCount = hasLowercase + hasUppercase + hasNumber + hasSymbol;
    const typesArr = [{ lower: hasLowercase }, { upper: hasUppercase }, { number: hasNumber }, { symbol: hasSymbol }]
      .filter(item => Object.values(item)[0]);

    if (typesCount === 0) {
      return '';
    }

    for (let i = 0; i < length; i++) {
      typesArr.forEach(type => {
        const funcName = Object.keys(type)[0];
        generatedPassword += randomFunc[funcName]();
      });
    }

    setPassword(generatedPassword.slice(0, length));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container">
      <h2 className="title">Password Generator</h2>
      <div className="result">
        <div className="result__title field-title">Generated Password</div>
        <div className="result__info right">{copied ? 'Copied' : 'Click to copy'}</div>
        <div className="result__viewbox" id="result" onClick={copyToClipboard}>{password}</div>
      </div>
      <div className="length range__slider" data-min="4" data-max="32">
        <div className="length__title field-title" data-length={length}>length: {length}</div>
        <input id="slider" type="range" min="4" max="32" value={length} onChange={(e) => setLength(e.target.value)} />
      </div>
      <div className="settings">
        <span className="settings__title field-title">Settings</span>
        <div className="setting">
          <input type="checkbox" id="uppercase" checked={hasUppercase} onChange={() => setHasUppercase(!hasUppercase)} />
          <label htmlFor="uppercase">Include Uppercase</label>
        </div>
        <div className="setting">
          <input type="checkbox" id="lowercase" checked={hasLowercase} onChange={() => setHasLowercase(!hasLowercase)} />
          <label htmlFor="lowercase">Include Lowercase</label>
        </div>
        <div className="setting">
          <input type="checkbox" id="number" checked={hasNumber} onChange={() => setHasNumber(!hasNumber)} />
          <label htmlFor="number">Include Numbers</label>
        </div>
        <div className="setting">
          <input type="checkbox" id="symbol" checked={hasSymbol} onChange={() => setHasSymbol(!hasSymbol)} />
          <label htmlFor="symbol">Include Symbols</label>
        </div>
      </div>
      <button className="btn generate" onClick={generatePassword}>Generate Password</button>
    </div>
  );
};

// Random Generators
function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
function getRandomSymbol() {
  const symbols = '~!@#$%^&*()_+{}":?><;.,';
  return symbols[Math.floor(Math.random() * symbols.length)];
}

export default App;