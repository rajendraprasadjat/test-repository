import { Link } from "@yext/pages/components";
import { useTranslation } from "react-i18next";
import * as React from "react";
/**
 * 
 * @param props 
 * @returns Return HTML Elements of Locator Breadcrumb
 */
const LocatorBread = (props:{ site: any;}) => {
  const { t} = useTranslation();
    return (
        <div className="breadcrumb">
            <ul>
              <li>
                <Link href="#">
                  {props.site.c_home ? props.site.c_home : t("Home")}
                </Link>
              </li>
             
              <li>{t("Store Locator")}</li>
            </ul>
        </div>
      );
    };
export default LocatorBread;