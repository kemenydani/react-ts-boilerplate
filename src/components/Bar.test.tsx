import React from "react";
import {mount} from "enzyme";
import {expect} from 'chai';
import Bar from "./Bar";

describe('Bar', () => {

    it('should render', () => {
        const wrapper = mount(
            <Bar text={"bar-text"}/>
        );

        expect(wrapper.find(Bar)).to.have.lengthOf(1);
    });
});
