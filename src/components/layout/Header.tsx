import { Link } from "@yext/pages/components";
import * as React from "react";

type props = {
  ByredoLogo: any;
  ByredoLinks: any;
};

/**
 *
 * @param props
 * @returns HTML elements of Header Component
 */
const Header = (props: props) => {
  const { ByredoLogo, ByredoLinks } = props;

  React.useEffect(() => {
    document.body.setAttribute("id", "body");
  });
  const toggle = () => {
    document.getElementById("body")?.classList.toggle("menu-opened");
  };

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width:1023px)");
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  const handleMediaQueryChange = (mediaQuery: any) => {
    if (mediaQuery.matches) {
      document.body.classList.add("mobile-hdr");
    } else {
      document.body.classList.remove("mobile-hdr");
    }
  };

  // Smallscreen - Stops

  return (
    <header className="site-header">
      <div className="container-lg">
        <div className="navbar">
          <div className="mobile-menu-btn lg:hidden">
            <button type="button" onClick={toggle} name="toggle-button">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
          <div className="logo">
            <Link href="https://www.byredo.com/uk_en/" className="">
              <img
                src={
                  ByredoLogo?.image?.url
                    ? ByredoLogo?.image?.url
                    : "https://a.mktgcdn.com/p-sandbox/cgYD0VBchE2WzmtcTHsS1MlzQyFCTlbcmgppR7wnNE8/600x120.png"
                }
                alt="Byredo Logo"
                title="Byredo"
              />
            </Link>
          </div>
          <div className="mid-nav">
            <ul>
              <li>
                {" "}
                <div className="mobile-menu-btn lg:hidden">
                  <button type="button" onClick={toggle} name="toggle-button">
                    <span></span>
                    <span></span>
                  </button>
                </div>
              </li>
              {ByredoLinks?.map((e: any, index: number) => {
                return e?.link && e?.label ? (
                  <li className="menu-item" key={index}>
                    <Link href={e.link} className="">
                      {e.label}
                    </Link>
                  </li>
                ) : null;
              })}
            </ul>
          </div>
          <div className="overflow-menu"></div>
          <div className="emply-bx"></div>
        </div>
      </div>
    </header>
  );
};
export default Header;
