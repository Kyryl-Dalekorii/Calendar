import './App.css';
import Calendar from './components/Calendar/Calendar';
import events from './mockedData/mockedEvents'

export default function App() {
  return (
    <div className="App">
      <Calendar events={events}/>
    </div>
  );
}

