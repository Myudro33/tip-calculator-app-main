import React, { useEffect, useState } from "react";
import dollar from "./assets/icon-dollar.svg";
import person from "./assets/icon-person.svg";

const App = () => {
  const tips = [
    {
      id: 1,
      amount: "5%",
      active: false,
    },
    {
      id: 2,
      amount: "10%",
      active: false,
    },
    {
      id: 3,
      amount: "15%",
      active: false,
    },
    {
      id: 4,
      amount: "25%",
      active: false,
    },
    {
      id: 5,
      amount: "50%",
      active: false,
    },
  ];
  const [arr, setarr] = useState([tips]);
  const [amount, setAmount] = useState();
  const [customAmount, setcustomAmount] = useState();
  const [bill, setBill] = useState();
  const [people, setpeople] = useState();
  const [error, seterror] = useState(false);
  const [tipAmount, settipAmount] = useState("$0.00");
  const [total, settotal] = useState("$0.00");
  const selectTip = (id) => {
    for (const obj of arr[0]) {
      obj.active = false;
      if (obj.id === id) {
        setarr([...arr, (obj.active = true)]);
      }
    }
  };
  const reset = () => {
    setAmount("");
    setcustomAmount("");
    setBill("");
    settipAmount("$0.00");
    settotal("$0.00");
    setpeople("");
    setarr([tips]);
  };
  const getTipAmount = () => {
    if (
      customAmount !== undefined &&
      customAmount !== 0 &&
      customAmount !== ""
    ) {
      setAmount(customAmount);
    }

    if (
      amount !== 0 ||
      amount !== "" ||
      (amount !== undefined && bill !== 0) ||
      bill !== "" ||
      (bill !== undefined && people !== 0) ||
      people !== "" ||
      people !== undefined
    ) {
      const finalTip =
        (bill / people) *
        Number("0." + `${Number(amount) === 5 ? "05" : amount}`);
      const finalTotal = bill / people + finalTip;
      settipAmount(`$${finalTip.toFixed(1)}`);
      settotal(`$${finalTotal.toFixed(1)}`);
    }
  };
  useEffect(() => {
    getTipAmount();
  });
  return (
    <div className="w-full h-screen bg-[#C5E4E7] flex flex-col items-center">
      <h1 className="tracking-[.5em] text-[#3D6666] text-2xl font-bold font-[monospace] md:mt-14 xs:mt-8">
        SPLI
        <br />
        TTER
      </h1>

      <div
        onClick={() => seterror(true)}
        className="md:w-[920px] xs:w-full md:h-[481px] xs:h-[900px] bg-[#ffffff] md:mt-10 xs:mt-5 rounded-3xl p-8 md:flex md:flex-row  xs:flex xs:flex-col  justify-between items-center"
      >
        <div className="md:w-1/2 xs:w-full h-full md:p-9 flex flex-col">
          <label className="flex flex-col text-[#5E7A7D] font-[monospace] tracking-widest font-bold text-base">
            <span className="flex justify-between">
              {" "}
              Bill{" "}
              {bill === 0 || bill === "" || (bill === undefined && error) ? (
                <p className="text-[#E17457] font-[monospace]">Can't be zero</p>
              ) : (
                <p className="text-[#E17457] font-[monospace]"></p>
              )}
            </span>
            <input
              value={bill}
              onChange={(e) => {
                setBill(Number(e.target.value));
              }}
              className={`h-[48px] rounded-md bg-[#F3F9FA] ${
                bill === 0 || bill === "" || (bill === undefined && error)
                  ? "border-red-500 border"
                  : "border-none"
              } outline-[#26C2AE] text-end text-2xl p-3 font-[monospace] font-bold text-[#00474B]`}
              type={"number"}
              placeholder="0"
            />
            <img
              className="absolute translate-y-10 translate-x-4"
              src={dollar}
              alt="img"
            />
          </label>
          <label className="flex flex-col font-[monospace] font-bold text-[#5E7A7D] mt-6 w-full text-base tracking-widest">
            <span className="flex justify-between">
              {" "}
              Select Tip %{" "}
              {amount === 0 ||
              amount === "" ||
              (amount === undefined && error) ? (
                <p className="text-[#E17457] font-[monospace]">Can't be zero</p>
              ) : (
                <p className="text-[#E17457] font-[monospace]"></p>
              )}
            </span>
            <div className="w-full flex flex-wrap justify-between">
              {arr[0].map((tip) => (
                <button
                  key={tip.id}
                  onClick={() => {
                    selectTip(tip.id);
                    setAmount(tip.amount.slice(0, tip.amount.length - 1));
                    setcustomAmount("");
                  }}
                  className={`font-[monospace] font-bold 
                text-xl rounded-md md:w-[107px] xs:w-[47%] h-[47px] mt-3
                ${
                  tip.active
                    ? "bg-[#26C2AE] text-black"
                    : "bg-[#00474B] text-white"
                }
                
                `}
                >
                  {tip.amount}
                </button>
              ))}
              <input
                className={`border-none md:w-[107px] xs:w-[47%] h-[47px] mt-3 bg-[#F3F9FA] text-end rounded-md outline-[#26C2AE] p-2 text-xl font-[monospace] font-bold text-[#004748] placeholder:text-[#004748]`}
                type="number"
                onChange={(e) => {
                  setcustomAmount(e.target.value);
                }}
                value={customAmount}
                placeholder="Custom"
              />
            </div>
          </label>
          <label className="flex flex-col text-[#5E7A7D] font-[monospace] tracking-widest font-bold text-base mt-10">
            <span className="flex justify-between">
              {" "}
              Number of People{" "}
              {people === 0 ||
              people === "" ||
              (people === undefined && error) ? (
                <p className="text-[#E17457] font-[monospace]">Can't be zero</p>
              ) : (
                <p className="text-[#E17457] font-[monospace]"></p>
              )}
            </span>
            <input
              className={`h-[48px] rounded-md bg-[#F3F9FA] outline-[#26C2AE] text-end text-2xl p-3 font-[monospace] font-bold text-[#00474B]
              ${
                people === 0 || people === "" || (people === undefined && error)
                  ? "border-red-500 border"
                  : "border-none"
              }
              `}
              value={people}
              type="number"
              placeholder="0"
              onChange={(e) => setpeople(Number(e.target.value))}
            />
            <img
              className="absolute translate-y-10 translate-x-4"
              src={person}
              alt="img"
            />
          </label>
        </div>
        <div className="md:w-1/2 md:h-full xs:w-full bg-[#00474B] rounded-xl p-10 md:mt-0 xs:mt-8">
          <div className="w-full flex justify-between md:mt-8">
            <span>
              <h1 className="text-white font-[monospace] font-bold md:text-2xl xs:text-base">
                Tip Amount
              </h1>
              <p className="font-[monospace] font-bold text-base text-[#7F9D9F]">
                / person
              </p>
            </span>
            <h1 className="text-[#26C2AE] font-[monospace] font-bold md:text-5xl xs:text-4xl">
              {tipAmount === "$NaN" || tipAmount === "$Infinity"
                ? "$0.00"
                : tipAmount}
            </h1>
          </div>
          <div className="w-full flex justify-between md:mt-10 xs:mt-4">
            <span>
              <h1 className="text-white font-[monospace] font-bold md:text-2xl xs:text-base">
                Total
              </h1>
              <p className="font-[monospace] font-bold text-base text-[#7F9D9F]">
                / person
              </p>
            </span>
            <h1 className="text-[#26C2AE] font-[monospace] font-bold md:text-5xl xs:text-4xl">
              {total === "$NaN" || total === "$Infinity" ? "$0.00" : total}
            </h1>
          </div>
          <button
            onClick={reset}
            className="w-full h-[50px] text-[#00474B] bg-[#26C2AE] hover:bg-[#9FE8DF] rounded-md text-2xl font-bold font-[monospace] md:top-24 xs:mt-5 relative"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
