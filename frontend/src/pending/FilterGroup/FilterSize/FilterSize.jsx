import React from "react";
import MyCheckbox from "../../../../components/MyCheckbox/MyCheckbox";
import FilterDropDownCheckbox from "../FilterDropDownCheckbox/FilterDropDownCheckbox";

function FilterPrice({ isChecked, handleChangeFilterSize }) {
    return (
        <>
            <FilterDropDownCheckbox
                filterTitle="Kích thước"
                option={
                    <ul>
                        <li>
                            <div>
                                <MyCheckbox
                                    id="sizeXS"
                                    name="sizeXS"
                                    value="sizeXS"
                                    label="Size XS"
                                    checked={isChecked?.sizeXS}
                                    onChange={(e) => handleChangeFilterSize(e)}
                                />
                            </div>
                        </li>
                        <li>
                            <div>
                                <MyCheckbox
                                    id="sizeS"
                                    name="sizeS"
                                    value="sizeS"
                                    label="Size S"
                                    checked={isChecked?.sizeS}
                                    onChange={(e) => handleChangeFilterSize(e)}
                                />
                            </div>
                        </li>
                        <li>
                            <div>
                                <MyCheckbox
                                    id="sizeM"
                                    name="sizeM"
                                    value="sizeM"
                                    label="Size M"
                                    checked={isChecked?.sizeM}
                                    onChange={(e) => handleChangeFilterSize(e)}
                                />
                            </div>
                        </li>
                        <li>
                            <div>
                                <MyCheckbox
                                    id="sizeL"
                                    name="sizeL"
                                    value="sizeL"
                                    label="Size L"
                                    checked={isChecked?.sizeL}
                                    onChange={(e) => handleChangeFilterSize(e)}
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
