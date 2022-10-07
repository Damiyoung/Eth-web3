import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import dummyData from "../utils/dummyData";
import { shortenAddress } from "../utils/shortenAddress";
import { GiHumanPyramid } from "react-icons/gi";
const TransactionCard = ({
  addressTo,
  addressFrom,
  timestamp,
  message,
  keyword,
  amount,
  url,
}) => {
  return (
    <div className="bg-[#181918] m-4 flex flex-1 2xl:min-w-[450px] 2xl:max-w-[500px] sm:min-w-[270px] sm:max-w-[300px] flex-col p-3 rounded-md hover:shadow-2xl   ">
      <div className=" flex flex-col items-center w-full mt-3">
        <div className=" w-full mb-6 p-2">
         
          <p className="text-white text-base">From:{ shortenAddress(addressFrom ) }</p>
          <p className="text-white text-base">From:{shortenAddress(addressTo)}</p>
          <p className="text-white text-base">Amount: {amount}</p>
          {message && (
            <>
              <br />
              <p className="text-white text-base">Message:{message} </p>
            </>
          )}
          </div>

          <GiHumanPyramid   className="w-full text-gray-50 h-64 2x:h-96 rounded-md shadow-lg object-cover animate-bounce "/>
            

          <div className="bg-white p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl ">
            <p className="text-[#37c7da] font-bold ">{ timestamp}</p>
          
        </div>
      </div>
    </div>
  );
};

const Transaction = () => {
  const { currentAccount } = useContext(TransactionContext);
  return (
    <div className="flex w-full justify-center items-center 2xl:px20 gradient-bg-transactions">
      <div className=" flex flex-col md:p-12 py-12 px-4">
        {currentAccount ? (
          <h3 className="text-white text-3xl text-center my-2 ">
            Latest Transaction{" "}
          </h3>
        ) : (
          <h3 className="text-white text-3xl text-center my-2 ">
            connect to see the Latest Transaction{" "}
          </h3>
        )}

        <div className="flex flex-wrap justify-center items-center mt-10">
          {dummyData.reverse().map((transaction, i) => (
            <TransactionCard key={i} {...transaction} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transaction;
