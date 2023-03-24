import React from "react";
import MyCheckbox from "../../../../components/MyCheckbox/MyCheckbox";
import FilterDropDownCheckbox from "../FilterDropDownCheckbox/FilterDropDownCheckbox";

function FilterPrice() {
    return (
        <>
            <FilterDropDownCheckbox
                filterTitle="Kích thước"
                option={
                    <ul>
                        <li>
                            <div>
                                <MyCheckbox
                                    id="optionSize1"
                                    name="optionSize1"
                                    label="Size XS"
                                />
                            </div>
                        </li>
                        <li>
                            <div>
                                <MyCheckbox
                                    id="optionSize2"
                                    name="optionSize2"
                                    label="Size S"
                                />
                            </div>
                        </li>
                        <li>
                            <div>
                                <MyCheckbox
                                    id="optionSize3"
                                    name="optionSize3"
                                    label="Size M"
                                />
                            </div>
                        </li>
                        <li>
                            <div>
                                <MyCheckbox
                                    id="optionSize4"
                                    name="optionSize4"
                                    label="Size L"
                                />
                            </div>
                        </li>
                    </ul>
                }
            />
        </>
    );
}

export default FilterPrice;
