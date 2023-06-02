import * as React from "react";
import CookieConsent from "react-cookie-consent";
import LocalesDropdown from "../common/LanguageDropdown";
import { Link } from "@yext/pages/components";
import Accordian from "./Accordian";
import FacebookIcon from "../../svg_icons/FacebookIcon";
import InstagramIcon from "../../svg_icons/InstagramIcon";

/**
 * @param props
 * @returns HTML elements of Footer Component
 */

const Footer = (props: any) => {
  const {
    emailAddress,
    footerHelpSection,
    servicesFooter,
    footerStoreLocator,
    customerCare,
    phone,
    path,
    _site,
  } = props;

  return (
    <>
      <div className="subfooter-sec">
        <div className="container-lg">
          <div className="subfooter-inner">
            <div className="subfooter-links">
              <div className="footer-link-column">
                <LocalesDropdown
                  updatelocale={path}
                  country={_site.c_countryFooter}
                  site={_site}
                />
                <Accordian
                  title={customerCare}
                  email={emailAddress}
                  phone={phone}
                />
              </div>

              <Accordian
                title={footerHelpSection?.helpTitle}
                links={footerHelpSection?.helpLinks}
              />

              <Accordian
                title={servicesFooter?.servicesTitle}
                labels={servicesFooter?.servicesList}
              />
              <Accordian
                title={footerStoreLocator?.helpTitle}
                links={footerStoreLocator.helpLinks}
              />
            </div>
          </div>
        </div>
        <div className="copyright-bx">
          <div className="float-left pt-2">© Byredo</div>
          <div className="social-media-footer">
            <Link
              href="https://www.instagram.com/officialbyredo/"
              target="_blank"
              rel="noopener noreferrer"
            >
             <InstagramIcon/>
            </Link>
            <Link
              href="https://www.facebook.com/byredo/"
              target="_blank"
              rel="noopener noreferrer"
            >
             <FacebookIcon/>
            </Link>
          </div>
        </div>
      </div>

      {/* Cookie Consent Section is for "To keep a user logged in as they browse from page to page." */}
      <CookieConsent
        buttonText={
          _site.c_cookieButton?.label
            ? _site.c_cookieButton?.label
            : "Accept all Cookies"
        }
        buttonStyle={{
          marginLeft: "100px",
        }}
      >
        <p>
          {_site.c_cookieText
            ? _site.c_cookieText
            : "Our site and our partners collect data and use cookies in accordance with our"}

          {_site.c_cookiePolicy?.label && _site.c_cookiePolicy?.link ? (
            <Link
              className="text-cookies-link p-2 font-bold"
              href={_site.c_cookiePolicy?.link}
            >
              {_site.c_cookiePolicy?.label}
            </Link>
          ) : (
            <Link
              className="text-cookies-link p-2 font-bold"
              href="https://www.byredo.com/eu_en/cookie-policy"
            >
              cookie policy
            </Link>
          )}

          {_site.c_cookieTextAfter
            ? _site.c_cookieTextAfter
            : "to enhance your experience, analyze traffic and for ad personalization and measurement. For more information on this and how to manage your cookies, please click cookie settings below."}
        </p>
      </CookieConsent>
    </>
  );
};
export default Footer;
