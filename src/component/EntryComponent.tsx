import React, {FunctionComponent} from 'react';

export const EntryComponent: FunctionComponent<any> = () => {

    return (
        <div className={"page"}>
            <a href={"/login"}><button>Sign in</button></a>
            <br/>
            <a href={"/register"}><button>Join</button></a>
        </div>
    );
}