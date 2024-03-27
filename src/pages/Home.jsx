import { useEffect } from "react";
import { Helmet } from "react-helmet";
import BitcoinCard from "../components/shared/BitcoinCard";
import Trending from "../components/shared/TrendingCoins";
import LineChart from "../components/specific/Chart";
import { connectWallet } from "../lib/wallet";
import Button from "@mui/material/Button";

const Home = () => {
  useEffect(() => {
    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        console.log("Please connect to MetaMask.");
      } else {
        console.log(`Connected account: ${accounts[0]}`);
      }
    };

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  }, []);

  return (
    <>
      {" "}
      <Helmet>
        <meta name="description" content="Your page description" />
        <title>Home Page</title>
        <link rel="icon" href="/assets/logo.svg" />
      </Helmet>
      <div className="flex flex-col mt-10 sm:mx-10 mx-4 max-sm:items-center">
        <div className="flex flex-col max-sm:gap-6 sm:flex-row justify-between items-center">
          <div className="flex flex-col gap-2">
            <div className="sm:text-[35px] text-[20px] font-[700]">
              Hello , <span className="gradient-text">Brooklyn Simmons</span>
            </div>
            <div className="sm:text-[20px] font-[500]">
              Welcome to <span className="text-[#6b21a8]">Spot trading!</span>
            </div>
          </div>
          <Button
            onClick={connectWallet}
            sx={{
              backgroundColor: "#6b21a8",
              color: "white",
              height: { xs: "40px", sm: "60px" },
              px: "20px",
              borderRadius: "4px",
              "&:hover": {
                backgroundColor: "#a855f7",
              },
              width: { xs: "100%", sm: "auto" },
            }}
          >
            Connect Wallet
          </Button>
        </div>
        <div className="mt-10 flex flex-row gap-10 flex-wrap max-sm:justify-center">
          {" "}
          <LineChart />
          <BitcoinCard />
        </div>
        <div className="mt-10">
          {" "}
          <Trending />
        </div>
      </div>
    </>
  );
};

export default Home;
