import './App.css';
import { TonConnectButton} from '@tonconnect/ui-react';
import { useState, useEffect } from 'react';
import { useMainContract } from "./hooks/useMainContract";
import { fromNano } from "@ton/core";
import { useTonConnect } from './hooks/useTonConnect';

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
	let cb : number
	if (contract_balance != null) {
			cb = contract_balance
  } else {
					cb = 1
			}

    const { connected } = useTonConnect()

    const [counterok, setCount] = useState(0);

    // useEffect to update the title of the document
    useEffect(() => {
        document.title = `You clicked ${counterok} times`;
    }, [counterok]); // Dependency array: re-run the effect only when count changes

  return (
    <div>
  <span>My App with React UI</span>
<TonConnectButton />
              <p>You clicked {counterok} times</p>
            <button onClick={() => setCount(counterok + 1)}>
                Click me
            </button>
        <div>
        <div className='Card'>
          <b>Our contract owner</b>
          <div className='Hint'>{owner_address?.toRawString().slice(0, 30) + "..."}</div>
          <b>Our contract recent_sender</b>
          <div className='Hint'>{recent_sender?.toRawString().slice(0, 30) + "..."}</div>
          <b>Our contract Address</b>
          <div className='Hint'>{contract_address?.slice(0, 30) + "..."}</div>
          <b>Our contract Balance</b>
          <div className='Hint'>{fromNano(cb)}</div>
        </div>
				{
								connected && (
								<a onClick={async() => {
												sendDeposit();
										}}
										>
										Deposit 1
										</a>
								)
						}

						</div>

        <div>
				{
								connected && (
								<a onClick={async() => {
												sendWithdraw();
										}}
										>
										Withdraw 1
										</a>
								)
						}
						</div>

        <div className='Card'>
          <b>Counter Value</b>
          <div>{counter_value ?? "Loading..."}</div>
        </div>
               {connected && (
              <a
                onClick={() => {
                  sendIncrement();
                }}
              >
                Increment
              </a>
            )}

    </div>
  );
}

export default App
