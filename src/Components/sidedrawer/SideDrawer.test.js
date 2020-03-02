import React from "react";
import SideDrawer from "./SideDrawer";
import DrawerToggleButton from "./DrawerToggleButton";

import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

describe(`SideDrawer component`, () => {
  it(`renders the SideDrawer component`, () => {
    const wrapper = shallow(<SideDrawer />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it(`renders the DrawerToggleButton component`, () => {
    const wrapper = shallow(<DrawerToggleButton />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
