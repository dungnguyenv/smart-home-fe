import { useState } from "react";
import HomePage from "./HomePage"
import LoginScreen from "./scenes/login/LoginScreen";



function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(true)
    const [user, setUser] = useState({})
    return (
        isAuthenticated ?
            <HomePage authentication={{ isAuthenticated, setIsAuthenticated, user }} />
            :
            <LoginScreen authentication={{ isAuthenticated, setIsAuthenticated, setUser }} />
    )
}

export default App;