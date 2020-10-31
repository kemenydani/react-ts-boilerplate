import * as React from 'react';

const Bar: React.FunctionComponent<{
    text: string;
}> = (props) => {
    if (props.text === "a") {
        return (<div>a</div>)
    } else {
        return (
            <div>
                Hello Bar {props.text}
            </div>
        );
    }
};

export default Bar;
