import Container from "@mui/material/Container";

import { Header } from "./components";
import { Home, FullMedicalNote, Registration, AddMedicalNote, Login } from "./pages";

function App() {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Home />
        <FullMedicalNote />
        <AddMedicalNote />
        <Login />
        <Registration />
      </Container>
    </>
  );
}

export default App;
