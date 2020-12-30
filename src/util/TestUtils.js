import React from 'react'
import {render} from '@testing-library/react'
import {store} from "../index";
import {Provider} from "react-redux";


const AllTheProviders = ({children}) => {
    return (

        <Provider store={store}>
            {children}
        </Provider>
    )
};

const customRender = (ui, options) =>
    render(ui, {wrapper: AllTheProviders, ...options})

// re-export everything
export * from '@testing-library/react'

// override render method
export {customRender as render}
