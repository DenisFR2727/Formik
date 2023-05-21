import "./header.css";

const Header = ({currency}) => {
    const usdToUah = currency.rates.UAH
    const eurToUah = currency.rates.UAH / currency.rates.EUR

        return (<header className="header">
            <div className="currency-container">
                <h3>Exchange</h3>
            <ul>
                <li>
                <span className="currency-label">USD / UAH:</span>{" "}
                    <span className="currency-value">
                        {usdToUah ? usdToUah.toFixed(2) : ""}
                    </span>
                </li>
                <li>
                <span className="currency-label">EUR / UAH:</span>{" "}
                    <span className="currency-value">
                        {eurToUah ? eurToUah.toFixed(2) : ""}
                    </span>
                </li>
            </ul>
            </div>
    </header>
    )
}
export default Header;