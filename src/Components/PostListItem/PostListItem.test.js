import React from "react";
import PostListItem from "./PostListItem"
import { shallow } from "enzyme"
import toJson from "enzyme-to-json"
import renderer from 'react-test-renderer'

describe(`PostListItem component`, () => {
    it(`renders the PostListItem feature`, () => {
        const wrapper = shallow(<PostListItem />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});