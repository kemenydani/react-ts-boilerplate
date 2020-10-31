import * as React from 'react';

const Foo = function (props) {
    if (props.text === "a") {
        return (<div>a</div>)
    } else {
        return (
            <div>
                Hello Foo {props.text}
            </div>
        );
    }
}

export default Foo;
