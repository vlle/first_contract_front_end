import './App.css';
import { TonConnectButton} from '@tonconnect/ui-react';
import { useState, useEffect } from 'react';
import { useMainContract } from "./hooks/useMainContract";
import { fromNano } from "@ton/core";
import { useTonConnect } from './hooks/useTonConnect';
import WebApp from '@twa-dev/sdk'


// 0QAYVStSV_O3UREVGyTGrtGFaFgWkf_GAuUelza1LbTbK4qr

function App() {
   const {
    contract_address,
    counter_value,
    recent_sender,
    owner_address,
    contract_balance,
		sendIncrement,
		sendDeposit,
		sendWithdraw,
  } = useMainContract();

    const { connected } = useTonConnect()

  const showAlert = () => {
    WebApp.showAlert("Hey there!");
  };

    const [counterok, setCount] = useState(0);

    // useEffect to update the title of the document
    useEffect(() => {
        document.title = `You clicked ${counterok} times`;
    }, [counterok]); // Dependency array: re-run the effect only when count changes

return (
    <div>
      <div>
        <TonConnectButton />
      </div>
      <div>
              <p>You clicked {counterok} times</p>
            <button onClick={() => setCount(counterok + 1)}>
                Click me
            </button>
        <div className='Card'>
          <b>{WebApp.platform}</b>
          <b>Our recent Address</b>
          <div className='Hint'>{recent_sender?.toString().slice(0, 30) + "..."}</div>
          <b>Our owdner Address</b>
          <div className='Hint'>{owner_address?.toString().slice(0, 30) + "..."}</div>
          <b>Our contract Address</b>
          <div className='Hint'>{contract_address?.slice(0, 30) + "..."}</div>
          <b>Our contract Balance</b>
          {contract_balance && (
            <div className='Hint'>{fromNano(contract_balance)}</div>
          )}
        </div>

        <div className='Card'>
          <b>Counter Value</b>
          <div>{counter_value ?? "Loading..."}</div>
        </div>

        <a
          onClick={() => {
            showAlert();
          }}
        >
          Show Alert
        </a>

        <br />

        {connected && (
          <a
            onClick={() => {
              sendIncrement();
            }}
          >
            Increment by 5
          </a>
        )}

        <br />

        {connected && (
          <a
            onClick={() => {
              sendDeposit();
            }}
          >
            Request deposit of 1 TON
          </a>
        )}

        <br />

        {connected && (
          <a
            onClick={() => {
              sendWithdraw();
            }}
          >
            Request 0.7 TON withdrawal
          </a>
        )}
      </div>
    </div>
  );
}

export default App
