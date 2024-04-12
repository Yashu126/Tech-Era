import './App.css'
import {Switch, Route} from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import Course from './components/Course'
import NotFound from './components/NotFound'

// Replace your code here
const App = () => (
  <div className="background-con">
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/courses/:id" component={Course} />
      <Route component={NotFound} />
    </Switch>
  </div>
)

export default App
