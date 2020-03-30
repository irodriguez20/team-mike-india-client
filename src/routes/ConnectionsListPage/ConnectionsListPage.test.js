import React from "react";
import ConnectionsListPage from "./ConnectionsListPage"
import { shallow } from "enzyme"
import toJson from "enzyme-to-json"
import renderer from 'react-test-renderer'

describe(`ConnectionsListPage component`, () => {
    it(`renders the ConnectionsListPage feature`, () => {
        const wrapper = shallow(<ConnectionsListPage />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});