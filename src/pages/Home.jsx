import BitcoinCard from "../components/shared/BitcoinCard";
import Trending from "../components/shared/TrendingCoins";
import LineChart from "../components/specific/Chart";

const Home = () => {
  return (
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
        <button className="bg-[#6b21a8] text-white h-[40px] sm:h-[60px] px-5 rounded-sm hover:bg-[#a855f7] max-sm:w-full">
          Start Trading
        </button>
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
  );
};

export default Home;
