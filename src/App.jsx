import { useRef ,  useEffect,useCallback, useState } from "react";

function App() {
  const [length, setlength] = useState(6);
  const [number, setnumber] = useState(false);
  const [character, setcharacter] = useState(false);
  const [password, setpassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let str = "";

    // if number allowed
    if (number) {
      pass = pass + " 0123456789 ";
    }
    // if char allowed
    if (character) {
      pass = pass + "!@#$%^&*";
    }

    for (let index = 1; index <= length; index++) {
      const char = Math.floor(Math.random() * pass.length + 1);
      
      str = str +  pass.charAt(char);
     
    }
    
  
    setpassword(str);
  }, [number, length, character]);


  //! use ref 
  const passwordRef = useRef( null) ; 

  const copyToClipboard = useCallback( ()=>{
    passwordRef.current?.select() ; 
    window.navigator.clipboard.writeText(password) ; 
  } , [password])

  useEffect(()=>{
    passwordGenerator() 
  } , [length , number , character]) ; 

  return (
    <>
    
      
     
      <div className=" m-10  mx-56 p-5 bg-violet-100 container max-h-screen">
        <h1 className="font-extrabold text-2xl my-10">Generate Password</h1>
        <div className="input ">
          <input
            
            value={password}
            type="text"
            placeholder="password"
            readOnly
            ref={passwordRef}
            className=" my-7 font-semibold text-stone-900  italic focus:outline-none  appearance-none w-3/5 rounded-xl border-stone-800 border-2"
          />
          <button onClick={copyToClipboard} className="btn bg-slate-400 hover:bg-slate-600 rounded-md p-1 m-2 mx-4">
            COPY
          </button>
        </div>
        <div className="dimnesion flex gap-5">
          <div className="length">
            <input
              type="range"
              className="cursor-pointer"
              min={6}
              max={100}
              value={length}
              onChange={(e) => {
                setlength(e.target.value);
              }}
            />
            <label className="text-purple-800 text-xl px-1 mx-3 hover:font-bold" >length:{length}</label>
          </div>
          <div className="number">
            <input 
              onChange={() => {
                setnumber((prev)=> !prev);
              }}
              type="checkbox"
              defaultChecked={number}
              className="cursor-pointer"
              
            />
            <label className="text-purple-800 text-xl px-1 hover:font-bold">Number</label>
          </div>
          <div className="character">
            <input 
              onChange={() => {
                setcharacter((prev)=> !prev);
              }}
              type="checkbox"
              className="cursor-pointer"
              min={6} 
              max={20}
            />
            <label className="text-purple-800 text-xl px-1 hover:font-bold" >character</label>

          </div>
        </div>
      </div>

    </>
  );
}

export default App;
