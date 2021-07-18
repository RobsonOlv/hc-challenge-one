import box from './box.png';
import React, { useEffect, useState } from 'react';
import './App.css';


function App(props) {

  const timer = () => {
    let year = new Date().getFullYear();
    let dif = +new Date(`11/26/${year}`) - +new Date();
  
    let timeLeft = {};
  
    if (dif > 0){
      timeLeft = {
        dias: Math.floor(dif / (1000 * 60 * 60 * 24)),
        horas: Math.floor((dif / (1000 * 60 * 60)) % 24),
        minutos: Math.floor((dif / 1000 / 60) % 60),
        segundos: Math.floor((dif / 1000) % 60)
      }
    }
    return timeLeft;
  }
  
  const [timeLeft, setTimeLeft] = useState(timer());
  
  useEffect(() => {
    const time = setTimeout(() => {
      setTimeLeft(timer());
    }, 1000);
    return () => clearTimeout(time);
  });
  
  const timerComponents = [];
  
  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }
  
    timerComponents.push(
      <span>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  const [a, setA] = useState(Math.floor(Math.random()*10));
  const [b, setB] = useState(Math.floor(Math.random()*10));

  const result = a+b;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [verify, setVerify] = useState('');

  let aux = false;
  if(name !== '' && email !== '' && verify == result){
    aux = true;
  }

  function submit(name, email){
    let data = [];
    setA(Math.floor(Math.random()*10));
    setB(Math.floor(Math.random()*10));

    if(localStorage.getItem('target') != null){
      data = JSON.parse(localStorage.getItem('target'));
    }
    data.push({name: name, email: email});
    localStorage.setItem('target', JSON.stringify(data));
  }

  return (

    <div className="App">
      <header className="App-header">
          <h1>First Challenge</h1>
      </header>
      <body className="App-body">
        <div className="App-container">

          <div className="container-info">
            <div className="title">
              <h1>BLACK</h1>
              <p>FRIDAY</p>
            </div>

            <div className="divis"></div>

            <div className="description">
              Preparamos combos imperdíveis para você. Não perca essa chance!
            </div>
            <img src={box} alt="" width="35%"/>
          </div>
          <div className="container-form">
            <h1>Seja avisado!</h1>
            <p>Preencha abaixo e te avisaremos por e-mail.</p>

            <div className="divis2"></div>
            <span className="form">
              <h5>Nome*</h5>
              <input type="text" value={name} onChange={e=>setName(e.target.value)}/>
            </span>
            <span className="form">
              <h5>Email*</h5>
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)}/>
            </span>
            <span className="form">
              <h5>{`${a} + ${b} = ?`}*</h5>
              <input type="number" value={verify} onChange={e=>setVerify(e.target.value)}/>
            </span>
            <span className="form">
              <button disabled={!aux} onClick={() => submit(name, email)}>
                Me Avise!
              </button>
              <p>
                Suas informações de contato não serão usadas
                para enviar qualquer tipo de SPAM.
              </p>
            </span>
          </div>
        </div>

        <div className="App-body-footer">
          {timerComponents.length ? timerComponents : <span>O tempo acabou!</span>}
        </div>
      </body>
    </div>
  );
}

export default App;
