import { createAppContainer, createSwitchNavigator } from 'react-navigation';

// Import screens
import Login from "./screens/Login";
import Home from "./screens/Home";

export default createAppContainer(
  createSwitchNavigator({
    Login,
    Home
  })
);
