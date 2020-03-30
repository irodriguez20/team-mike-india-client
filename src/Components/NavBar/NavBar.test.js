import React from "react";
import NavBar from "./NavBar"
import { shallow } from "enzyme"
import toJson from "enzyme-to-json"
import renderer from 'react-test-renderer'

describe(`NavBar component`, () => {
    it(`renders the NavBar feature`, () => {
        const wrapper = shallow(<NavBar />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});