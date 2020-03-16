import React from "react";
import SignUpForm from "./SignUpForm"
import { shallow } from "enzyme"
import toJson from "enzyme-to-json"
import renderer from 'react-test-renderer'

describe(`SignUpForm component`, () => {
    it(`renders the two forms; A SIGNUP and SIGNIN form`, () => {
        const wrapper = shallow(<SignUpForm />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});