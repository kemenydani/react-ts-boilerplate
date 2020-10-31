import React from "react";
import {mount} from "enzyme";
import {expect} from 'chai';
import Foo from "./Foo";

describe('Foo', () => {

    it('should render', () => {
        const wrapper = mount(
            <Foo text={"foo-text"}/>
        );

        console.log(wrapper)

        expect(wrapper.find(Foo)).to.have.lengthOf(1);
    });
});
