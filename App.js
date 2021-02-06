import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Home from "./containers/Home";
const App = createStackNavigator({
  Home: {
    screen: Home,
  },
});

export default createAppContainer(App);
