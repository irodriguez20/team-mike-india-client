import React from "react";
import Connection from "./Connection"
import { shallow } from "enzyme"
import toJson from "enzyme-to-json"
import renderer from 'react-test-renderer'

describe(`Connection component`, () => {
    it(`renders the Connection feature`, () => {
        const wrapper = shallow(<Connection />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});