import { useState } from "react";
import HomePage from "./HomePage"
import LoginScreen from "./scenes/login/LoginScreen";



function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    return (
        isAuthenticated ?
            <HomePage authentication={{ isAuthenticated, setIsAuthenticated }} />
            :
            <LoginScreen authentication={{ isAuthenticated, setIsAuthenticated }} />
    )
}

export default App;