/**
 * This is an Address Component
 * @param props
 * @returns Html elements of Address Component..
 */
import * as React from "react";
const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
const Address = (props: any) => {
  const { address } = props;
  return (
    <h4 className="location-address">
      <span className="">{address?.line1}</span> <br />
      {address?.line2 && (
        <span className="">
          {address?.line2} <br/>
        </span>
      )}
      <span className="">
        {address?.city}, {address?.region}
      </span>
      <br/>
      {
        <span className="">
           {regionNames.of (address?.countryCode)}, {address?.postalCode}
        </span>
      }
    </h4>
  );
};
export default Address;
