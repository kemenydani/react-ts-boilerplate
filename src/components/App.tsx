import * as React from 'react';
import Foo from "./Foo.jsx";
import Bar from "./Bar";

const App: React.FunctionComponent<{
    uuid: string;
}> = (props) => {
    return (
        <>
            <Foo text={"foo-text"} />
            <Bar text={"bar-text"} />
        </>
    );
};

export default App;