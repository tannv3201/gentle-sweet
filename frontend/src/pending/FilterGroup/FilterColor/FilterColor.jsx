import React from "react";
import MyCheckbox from "../../../../components/MyCheckbox/MyCheckbox";
import FilterDropDownCheckbox from "../FilterDropDownCheckbox/FilterDropDownCheckbox";

function FilterColor({ isChecked, handleChangeFilterColor }) {
    return (
        <>
            <FilterDropDownCheckbox
                filterTitle="Màu sắc"
                option={
                    <ul>
                        <li>
                            <div>
                                <MyCheckbox
                                    id="redColor"
                                    name="redColor"
                                    value="redColor"
                                    label="Đỏ"
                                    checked={isChecked?.redColor}
                                    onChange={(e) => handleChangeFilterColor(e)}
                                />
                            </div>
                        </li>
                        <li>
                            <div>
                                <MyCheckbox
                                    id="orangeColor"
                                    name="orangeColor"
                                    value="orangeColor"
                                    label="Cam"
                                    checked={isChecked?.orangeColor}
                                    onChange={(e) => handleChangeFilterColor(e)}
                                />
                            </div>
                        </li>
                        <li>
                            <div>
                                <MyCheckbox
                                    id="yellowColor"
                                    name="yellowColor"
                                    value="yellowColor"
                                    label="Vàng"
                                    checked={isChecked?.yellowColor}
                                    onChange={(e) => handleChangeFilterColor(e)}
                                />
                            </div>
                        </li>
                        <li>
                            <div>
                                <MyCheckbox
                                    id="greenColor"
                                    name="greenColor"
                                    value="greenColor"
                                    label="Xanh lá"
                                    checked={isChecked?.greenColor}
                                    onChange={(e) => handleChangeFilterColor(e)}
                                />
                            </div>
                        </li>
                        <li>
                            <div>
                                <MyCheckbox
                                    id="pinkColor"
                                    name="pinkColor"
                                    value="pinkColor"
                                    label="Hồng"
                                    checked={isChecked?.pinkColor}
                                    onChange={(e) => handleChangeFilterColor(e)}
                                />
                            </div>
                        </li>
                        <li>
                            <div>
                                <MyCheckbox
                                    id="blackColor"
                                    name="blackColor"
                                    value="blackColor"
                                    label="Đen"
                                    checked={isChecked?.blackColor}
                                    onChange={(e) => handleChangeFilterColor(e)}
                                />
                            </div>
                        </li>
                        <li>
                            <div>
                                <MyCheckbox
                                    id="whiteColor"
                                    name="whiteColor"
                                    value="whiteColor"
                                    label="Trắng"
                                    checked={isChecked?.whiteColor}
                                    onChange={(e) => handleChangeFilterColor(e)}
                                />
                            </div>
                        </li>
                    </ul>
                }
            />
        </>
    );
}

export default FilterColor;
