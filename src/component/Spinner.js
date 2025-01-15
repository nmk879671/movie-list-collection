import React, { useEffect, useState } from "react";
import { Wheel } from "react-custom-roulette";
import { Button } from "@mui/material";

const getRandomColor = () => {
  let color;
  do {
    color = `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .toUpperCase()}`;
  } while (color === "#FFFFFF");
  return color;
};

export default function Spinner({ items = [] }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(
      items.map(r => ({
        option: r,
        style: {
          backgroundColor: getRandomColor(),
          textColor: "#fff"
        }
      }))
    );
  }, []);

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  return (
    data.length > 0 && (
      <div
        style={{
          textAlign: "center",
          padding: "40px 40px",
          overFlow: "hidden"
        }}
      >
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          outerBorderColor={"#ccc"}
          outerBorderWidth={10}
          innerBorderColor={"#f0f0f0"}
          radiusLineColor={"#ddd"}
          radiusLineWidth={5}
          textColors={["#ffffff"]}
          fontSize={18}
          onStopSpinning={() => setMustSpin(false)}
        />
        <Button
          size="large"
          variant="contained"
          color="success"
          onClick={handleSpinClick}
          style={{ marginTop: "20px" }}
        >
          Spin
        </Button>
      </div>
    )
  );
}
