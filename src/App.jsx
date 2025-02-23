import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numAll, setNumAll] = useState(false);
  const [sudh, setSudh] = useState(false);
  const [charAll, setCharAll] = useState(false);
  const [password, setPassword] = useState("")
  const [copied, setCopied] = useState("Copy")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAll) str += "0123456789";
    if (charAll) str += "!@#$%^&*()_+{}'/?.,<>";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    if(length==15 && sudh==true)pass="SUDHANSHU SINGH";
    setPassword(pass);
    setCopied("Copy");
  }, [length, sudh, numAll, charAll, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
    setCopied("Copied");

  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, sudh, numAll, charAll, passwordGenerator])

  return (
    <div className="mt-50 flex justify-center items-center">
    <div className="w-auto h-auto mx-auto shadow-lg rounded-xl px-6 py-5 my-12 bg-gray-900 text-orange-500">
      <h1 className='text-white text-center underline font-bold text-3xl mb-10 rounded-xl px-2 py-1'>Password Generator
      <p className='text-xs font-normal mt-3 flex justify-center items-center'>SUDHANSHU SINGH at Length: 15 
        <input className='ml-2 mt-0.5 w-3 h-3' type='checkbox' checked={sudh} onChange={() => setSudh((sudh) => !sudh)}></input></p>
      
      </h1>
      
      <div className="flex shadow-lg rounded-lg overflow-hidden mb-5">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-2 px-3 bg-gray-700 text-white rounded-l-lg"
          placeholder="Generated Password"
          readOnly
          ref={passwordRef}
        />
        <button
        onClick={copyPasswordToClipboard}
        className="bg-blue-600 hover:bg-gray-200 hover:text-black text-white px-4 py-2 rounded-r-lg"
      >
        {copied}
      </button>
      
      </div>
      <div className='flex flex-col text-sm space-y-4'>
        <div className='flex items-center justify-between'>
          <label className="text-white">Length: {length}</label>
          <input
            type="range"
            min={6}
            max={50}
            value={length}
            className='cursor-pointer w-2/3 accent-orange-500'
            onChange={(e) => setLength(Number(e.target.value))}
          />
        </div>
        <div className="flex items-center justify-between">
          <label className="text-white">Include Numbers</label>
          <input
            type="checkbox"
            checked={numAll}
            className="w-5 h-5 accent-orange-500"
            onChange={() => setNumAll((prev) => !prev)}
          />
        </div>
        <div className="flex items-center justify-between">
          <label className="text-white">Include Special Characters</label>
          <input
            type="checkbox"
            checked={charAll}
            className="w-5 h-5 accent-orange-500"
            onChange={() => setCharAll((prev) => !prev)}
          />
        </div>
      </div>
    </div>
    </div>
  );
}
export default App;
