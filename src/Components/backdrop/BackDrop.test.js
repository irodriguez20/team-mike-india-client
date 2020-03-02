import React from "react";
import BackDrop from "./BackDrop"
import { shallow } from "enzyme"
import toJson from "enzyme-to-json"
import renderer from 'react-test-renderer'

describe(`BackDrop component`, () => {
    it(`renders the BackDrop feature`, () => {
        const wrapper = shallow(<BackDrop />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});