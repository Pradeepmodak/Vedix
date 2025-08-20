import React from "react";
import { useParams } from "react-router-dom";
import SutraVisualizer1 from "../pages/SutraVisualizer1";
import SutraVisualizer2 from "../pages/SutraVisualizer2";
const RoutingScheme = () => {
  const { id } = useParams();
  const renderSutra = () => {
    switch (id) {
      case "1":
        return <SutraVisualizer1 />;
      case "2":
        return <SutraVisualizer2 />;
      // add more cases for other sutras
      default:
        return <div>Sutra not found</div>;
    }
  };
  return <div>{renderSutra()}</div>;
};

export default RoutingScheme;
