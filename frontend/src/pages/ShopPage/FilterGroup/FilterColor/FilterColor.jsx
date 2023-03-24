import React from "react";
import MyCheckbox from "../../../../components/MyCheckbox/MyCheckbox";
import FilterDropDownCheckbox from "../FilterDropDownCheckbox/FilterDropDownCheckbox";

function FilterColor() {
    return (
        <>
            <FilterDropDownCheckbox
                filterTitle="Màu sắc"
                option={
                    <ul>
                        <li>
                            <div>
                                <MyCheckbox
                                    name="optionSize1"
                                    label="Size XS"
                                />
                            </div>
                        </li>
                        <li>
                            <div>
                                <MyCheckbox name="optionSize2" label="Size S" />
                            </div>
                        </li>
                        <li>
                            <div>
                                <MyCheckbox name="optionSize3" label="Size M" />
                            </div>
                        </li>
                        <li>
                            <div>
                                <MyCheckbox name="optionSize4" label="Size L" />
                            </div>
                        </li>
                    </ul>
                }
            />
        </>
    );
}

export default FilterColor;
