import { Container } from "./styles";
import PageTop from "../components/PageTop";
import Input from "../components/Input";
import ItemRepo from "../components/ItemRepo";
import { useState } from "react";

function App() {

  const [repos, setRepos] = useState();




  return (
    <Container>
      <PageTop /> <br/>
      <Input />
      <ItemRepo />
    </Container>
  );
}

export default App;
