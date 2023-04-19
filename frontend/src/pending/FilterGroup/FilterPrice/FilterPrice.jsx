import React, { useState } from "react";
import MyCheckbox from "../../../../components/MyCheckbox/MyCheckbox";
import FilterDropDownCheckbox from "../FilterDropDownCheckbox/FilterDropDownCheckbox";

function FilterPrice({ isChecked, handleChangeFilterPrice }) {
    // const [filterPriceValue, setFilterPriceValue] = useState([]);

    // const [isChecked, setIsChecked] = useState({
    //     optionPrice1: false,
    //     optionPrice2: false,
    //     optionPrice3: false,
    //     optionPrice4: false,
    //     optionPrice5: false,
    // });

    // const handleChangeFiler = (e) => {
    //     setIsChecked({ ...isChecked, [e.target.name]: e.target.checked });
    //     if (e.target.checked === true) {
    //         setFilterPriceValue([...filterPriceValue, e.target.value]);
    //     } else {
    //         const newArr = filterPriceValue.filter(
    //             (value) => value !== e.target.value
    //         );
    //         setFilterPriceValue(newArr);
    //     }
    // };

    return (
        <>
            <FilterDropDownCheckbox
                filterTitle="Giá"
                option={
                    <ul>
                        <li>
                            <div>
                                <MyCheckbox
                                    id="optionPrice1"
                                    name="optionPrice1"
                                    label="Dưới 100.000₫"
                                    value="optionPrice1"
                                    checked={isChecked?.optionPrice1}
                                    onChange={(e) => handleChangeFilterPrice(e)}
                                />
                            </div>
                        </li>
                        <li>
                            <div>
                                <MyCheckbox
                                    id="optionPrice2"
                                    name="optionPrice2"
                                    label="100.000₫ - 250.000₫"
                                    value="optionPrice2"
                                    checked={isChecked?.optionPrice2}
                                    onChange={(e) => handleChangeFilterPrice(e)}
                                />
                            </div>
                        </li>
                        <li>
                            <div>
                                <MyCheckbox
                                    id="optionPrice3"
                                    name="optionPrice3"
                                    label="250.000₫ - 500.000₫"
                                    value="optionPrice3"
                                    checked={isChecked?.optionPrice3}
                                    onChange={(e) => handleChangeFilterPrice(e)}
                                />
                            </div>
                        </li>
                        <li>
                            <div>
                                <MyCheckbox
                                    id="optionPrice4"
                                    name="optionPrice4"
                                    label="500.000₫ - 800.000₫"
                                    value="optionPrice4"
                                    checked={isChecked?.optionPrice4}
                                    onChange={(e) => handleChangeFilterPrice(e)}
                                />
                            </div>
                        </li>
                        <li>
                            <div>
                                <MyCheckbox
                                    id="optionPrice5"
                                    name="optionPrice5"
                                    label="Trên 800.000₫"
                                    value="optionPrice5"
                                    checked={isChecked?.optionPrice5}
                                    onChange={(e) => handleChangeFilterPrice(e)}
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
