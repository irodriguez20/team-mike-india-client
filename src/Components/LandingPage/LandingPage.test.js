import React from "react";
import LandingPage from "./LandingPage"
import { shallow } from "enzyme"
import toJson from "enzyme-to-json"
import renderer from 'react-test-renderer'

describe(`LandingPage component`, () => {
    it(`renders the LandingPage feature`, () => {
        const wrapper = shallow(<LandingPage />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});