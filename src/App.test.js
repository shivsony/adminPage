import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';

import App from './App';


describe("unit-test", () => {
    it("render without crashing", () => {
        const div = document.createElement('div');
        const { getByTestId } = render(
            <MemoryRouter initialEntries={['/admin']}>
                <App />
            </MemoryRouter>, div
        )

        let tree = getByTestId("admin-page")
        expect(tree).toBeInTheDocument();
        ReactDOM.unmountComponentAtNode(div);
    })
})