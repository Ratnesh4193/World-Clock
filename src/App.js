import AddTimer from "./component/AddTimer"
import WorldClock from "./component/WorldClock"
import './component/AddTimer.css'

const App=()=>{
  return (
  <div className="app" style={{height:"95vh"}}>
    <AddTimer/>
    <WorldClock/>
    </div>
  )
}

export default App