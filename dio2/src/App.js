import React, {useState } from "react";

const App = () => {

    const [usuarios, setUsuarios] = useState(["Nome 1", "Nome 2", "Nome 3"]);

    return (
        <div className="App">
            <h1>Hello World!</h1>
        </div>
    );
};

export default App;