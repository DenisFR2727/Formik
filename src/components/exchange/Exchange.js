import { useState, useEffect } from "react";
import Header from "../header/Header";
import Convertor from "../convertor/Convertor";

import "./exchange.css";

const Exchange = () => {
    const [currency, setCurrency] = useState({ rates: {} });
    const [selectedCurrency, setSelectedCurrency] = useState("UAH");

    useEffect(() => {
        exhangeValue()
    },[])

    const exhangeValue =  () => {
        const _apikey = "dfb0cd3acc664714be02be2fd1eb7a55";
        fetch(`https://openexchangerates.org/api/latest.json?app_id=${_apikey}`)
          .then((response) => response.json())
          .then((data) => {
            setCurrency(data);
          })
          .catch((error) => {
            console.log("Error fetching currency", error);
          });
    }
    const handleCurrencyChange = (event) => {
        setSelectedCurrency(event.target.value);
      };

    return(<div>
            <div className="currency-container">
                <Header 
                    currency={currency}
                />
           </div>
                <Convertor
                    currency={currency}
                    selectedCurrency={selectedCurrency}
                    onCurrencyChange={handleCurrencyChange}
                />
    </div>)
}
export default Exchange;