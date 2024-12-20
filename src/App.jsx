import './App.css'
import { TablaDinamica } from './components/TablaDinamica'

function App() {

  return (
    <div className='max-w-full h-full flex flex-col items-center'>
      <p className="text-4xl font-bold">
        Tabla Dinamica
      </p>
      <TablaDinamica />
    </div>
  )
}

export default App
