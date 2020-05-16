import React from 'react';
import { Redirect, Route } from 'react-router-dom'

export default ({ component: C, appProps, ...rest }) =>
<div>
    <Route
        {...rest}
        render={props =>
            !appProps.isAuthenticated
                ? <C {...props} {...appProps} {...rest} />
                : <Redirect to="/" />}/>;
</div>