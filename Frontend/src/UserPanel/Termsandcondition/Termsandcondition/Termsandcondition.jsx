
import React from "react";
import './Termsandcondition.css'
import Terms from "../Terms/Terms";
import Condition from "../Conditions/Conditions";
import ImageHead from "../../../components/ImageHead/ImageHead";

const Termsandcondition = () => {
  return (
    <>
      <ImageHead Title = "Terms and Conditions"/>
      <Terms />
      <Condition />
    </>
  )
}

export default Termsandcondition;