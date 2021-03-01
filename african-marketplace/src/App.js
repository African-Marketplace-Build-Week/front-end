import React from "react";
import "./styles/styles.css";
import Home from './components/Home';

function App() {
  return (
    <div className="App">

      <Home />

      <Router>
        <Link to="/">Home</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Log In</Link>
        {/* <Route exact path="/" component={Home} /> */}
        <Route path="/signup" component={Signup} />
        {/* <Route path="/login" component={Login} /> */}
      </Router>

    </div>
  );
}

export default App;
