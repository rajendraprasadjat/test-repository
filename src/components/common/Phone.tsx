import * as React from "react";
import { formatPhoneNumber } from "react-phone-number-input";
import { Link } from "@yext/pages/components";

/**
 * 
 * @param props 
 * @returns html element of phone component.
 */
const Phone = (props: any) => {
  const { phone } = props;
  const formattedPhone = formatPhoneNumber(phone);
  return (
    <>
      {phone && (
        <div className="location-phone ">
          <Link
            className="phone-number  onhighLight"
            data-ya-track="phone"
            href={`tel:${phone}`}
            rel="noopener noreferrer"
          >
            {formattedPhone}
          </Link>
        </div>
      )}
    </>
  );
};
export default Phone;
