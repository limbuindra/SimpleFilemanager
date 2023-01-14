import React,{useState, useEffect} from 'react'

const Progressbar = () => {
    const [filled, setFilled] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
 if(filled < 100 && isRunning){
    setTimeout(() => setFilled( prev => prev += 5),30)
 }
    }, [filled, isRunning])
    
  return (
    <>
    <div className="progressbar">
        <div style={{ height: "100%",
        width: `${filled}%`,
        backgroundColor:"#a66cff",
        transition:"width 0.5s"
    }}></div>
    <span className='progressPercent'>{filled}%</span>

    <button className='btn' onClick={()=> setIsRunning(true)}>Run</button>
    </div>
    </>
  )
}

export default Progressbar;