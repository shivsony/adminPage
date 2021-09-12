import { ThemeProvider } from "styled-components";
import {
  Switch,
  Route,
} from "react-router-dom";
import './App.scss';
import theme from "./utils/theme";
import CssBaseline from '@material-ui/core/CssBaseline';


import { ROUTES } from "./utils/constants";
import AdminPage from "./containers/AdminPage/AdminPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Switch>
          <Route exact path={ROUTES.home}>
            <AdminPage />
          </Route>
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
