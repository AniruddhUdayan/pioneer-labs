import { useState, useEffect } from "react";

const BitcoinCard = () => {
  const [bitcoin, setBitcoin] = useState({
    chartName: "",
    bpi: { USD: { rate: "" }, GBP: { rate: "" }, EUR: { rate: "" } },
  });

  useEffect(() => {
    const fetchBitcoinPrice = async () => {
      try {
        const response = await fetch(
          "https://api.coindesk.com/v1/bpi/currentprice.json"
        );
        const data = await response.json();
        setBitcoin(data);
      } catch (error) {
        console.error("Error fetching Bitcoin price:", error);
        setBitcoin("Unavailable");
      }
    };

    fetchBitcoinPrice();
  }, []);
  console.log(bitcoin);
  return (
    <div className="bg-[#1c1c1c] p-5 flex flex-col rounded-[20px] max-h-[350px]">
      <div className="text-[20px] font-[700] flex justify-center">Top Coin</div>
      <div className="bg-[#2b2b2b] p-1 min-w-[250px] h-[5px] mt-3 rounded-[20px]"></div>
      <div className="flex flex-col mt-5">
        <div className="flex flex-row justify-evenly items-center">
          <img
            src="https://cryptologos.cc/logos/bitcoin-btc-logo.png"
            alt="Bitcoin"
            className="w-[50px] h-[50px]"
          />
          <div className="text-[20px]">{bitcoin.chartName}(BTC)</div>
        </div>
        <div className="font-[700] text-[20px] mt-5">Prices</div>
        <div className="flex flex-col gap-2 px-2 mt-2">
          <div className="flex justify-between">
            <div className="text-[20px]">USD</div>
            <div className="text-[20px]">$ {bitcoin.bpi.USD.rate}</div>
          </div>
          <div className="flex justify-between">
            <div className="text-[20px]">GBP</div>
            <div className="text-[20px]">£ {bitcoin.bpi.GBP.rate}</div>
          </div>
          <div className="flex justify-between">
            <div className="text-[20px]">EUR</div>
            <div className="text-[20px]">€ {bitcoin.bpi.EUR.rate}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BitcoinCard;
