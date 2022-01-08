import Navbar from './Components/Navbar'
import Banner from './Components/Banner'
import Movies from './Components/Movies'
import Favourite from './Components/Favourite'
import { BrowserRouter as Router,Switch,Route, BrowserRouter} from 'react-router-dom';
import './App.css';
function App() {
  // styleSheet for a div
  return (
    <Router>
      <Navbar/>
      {
      /* Router wrap krta hai jisse routing available ho jae */}
      {/* Route ko ek page tak hi limit rkhne ke liye switch use krte hain exact laga kr */}
      <Switch>
      <Route path='/' exact render = {(props)=>(
        <>
          <Banner {...props}/>
          <Movies {...props}/>
        </>
      )}
        />
      <Route path='/favourites'  component={Favourite}/>
      </Switch>
    {/* <Banner/>
    <Movies/>
    <Favourite/> */}
    </Router>
  );
}
// exporting App component
export default App;