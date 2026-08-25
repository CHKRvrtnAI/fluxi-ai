import Toolbar from './components/Toolbar'
import BlueprintEditor from './components/BlueprintEditor'

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Toolbar />
      <div style={{ flex: 1 }}>
        <BlueprintEditor />
      </div>
    </div>
  )
}

export default App
