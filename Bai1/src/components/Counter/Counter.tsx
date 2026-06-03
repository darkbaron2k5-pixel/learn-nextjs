"use client"
import { useState } from "react";

const Counter = () => {
    const [count,setCount] = useState<number>(0);
    return(
        <>
            <div className="counter">
                <h1>hello world</h1>
                <h2>count = {count}</h2>
                <button style={{marginRight:10}} onClick={() => setCount(count + 1)}>Increase</button>
                <button onClick={() => setCount(count - 1)}>Decrease</button>
            </div>
        </>
    )
}
export default Counter;