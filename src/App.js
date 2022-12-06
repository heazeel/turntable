import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import { LuckyWheel } from '@lucky-canvas/react';
import { Modal } from 'antd';
import Form from './form';

const color1 = '#e9e8fe';
const color2 = '#b8c5f2';

function App() {
  const [blocks] = useState([{ padding: '10px', background: '#869cfa' }]);
  const [prizes, setPrizes] = useState();
  const [buttons] = useState([
    { radius: '35%', background: '#617df2' },
    { radius: '30%', background: '#afc8ff' },
    {
      radius: '25%',
      background: '#869cfa',
      pointer: true,
      fonts: [{ text: '吃什么', top: '-10px', fontColor: 'yellow' }]
    }
  ]);
  const myLucky = useRef();

  useEffect(() => {
    if (!localStorage.getItem('prizes')) {
      let initPrizes = [
        { background: color1, fonts: [{ text: '海底捞', top: '50px' }], range: 1 },
        { background: color2, fonts: [{ text: '螺蛳粉', top: '50px' }], range: 1 },
        { background: color1, fonts: [{ text: '小馄饨', top: '50px' }], range: 1 },
        { background: color2, fonts: [{ text: '薄饼', top: '50px' }], range: 1 },
        { background: color1, fonts: [{ text: '麻辣烫', top: '50px' }], range: 1 },
        { background: color2, fonts: [{ text: '汉堡', top: '50px' }], range: 1 }
      ];
      setPrizes(initPrizes);
      localStorage.setItem('prizes', JSON.stringify(initPrizes));
    } else {
      try {
        let initPrizes = JSON.parse(localStorage.getItem('prizes'));
        setPrizes(initPrizes);
      } catch (e) {
        console.log(e);
      }
    }
  }, []);

  return (
    <>
      <div className="turntable_title">张总干饭小转盘</div>
      <div className="turntable_wrap">
        <LuckyWheel
          ref={myLucky}
          width="32vw"
          height="32vw"
          blocks={blocks}
          prizes={prizes}
          buttons={buttons}
          onStart={() => {
            // 点击抽奖按钮会触发star回调
            myLucky.current.play();
            setTimeout(() => {
              const index = (Math.random() * 6) >> 0;
              myLucky.current.stop(index);
            }, 2500);
          }}
          onEnd={(prize) => {
            // 抽奖结束会触发end回调
            Modal.success({
              title: `今天吃【${prize.fonts[0].text}】`
            });
          }}
        />
        <Form prizes={prizes} setPrizes={setPrizes} />
      </div>
    </>
  );
}

export default App;
