import NumberFormat from "react-number-format";

function CurrencyFormat(props) {
    const { value } = props;
    return (
        <NumberFormat
            value={value}
            displayType={"text"}
            thousandSeparator={true}
            suffix={" đ"}
        />
    );
}
