/* eslint-disable react/jsx-key */
/* eslint-disable no-var */
/* eslint-disable react/prop-types */
import * as React from "react";
import favicon from "../images/favicon.png";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import RtfConverter from "@yext/rtf-converter";
import {
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
  GetPath,
  Template,
  TemplateConfig,
} from "@yext/pages";
import "../index.css";
export const config: TemplateConfig = {
  stream: {
    $id: "404",
    filter: {
      entityIds: ["global-data"],
    },
    fields: ["id", "uid", "meta", "name"],
    localization: {
      locales: ["en_GB"],
      primary: false,
    },
  },
};

// The path must be exactly 404.html
export const getPath: GetPath<TemplateProps> = () => {
  const url = `/404.html`;
  return url;
};

// Add a title to the page
export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: "404 Not Found",
    tags: [
      {
        type: "link",
        attributes: {
          rel: "icon",
          type: "image/png",
          href: favicon,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "robots",
          content: "noindex, nofollow",
        },
      },
    ],
  };
};

// Template that will show as the page
const FourOhFour: Template<TemplateRenderProps> = ({ document, path }) => {
  const { _site } = document;
  if (_site.c_fourDes) {
    var Desc = RtfConverter.toHTML(_site.c_fourDes);
  }
  let currentUrl = "";
  const myArray = path.split("/");
  currentUrl = myArray && myArray[1];
  const updatelocale = (locale: any) => {
    return (window.location.pathname = `${locale}/${currentUrl}`);
  };
  return (
    <>
      {/* <JsonLd<FourOhFour>
        item={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Well Pharmacy",
          url: "https://www.well.co.uk/",
          logo: "https://images.prismic.io/wellpharmacy-test/ad06d0dc-d97a-4148-a2ab-2570adc639c3_Well.svg?auto=compress,format",
        }}
      /> */}
      <Header
        ByredoLogo={_site.c_byradoLogo}
        ByredoLinks={_site.c_headerMenus}
      />

      <div className="content-list ">
        <div className="container mx-96">
          <h1 className="text-2xl">
            {_site.c_fourTitle
              ? _site.c_fourTitle
              : "Our apologies, we we are not able to find the page you are looking for.."}
          </h1>
          <br />
          <div
            className="leading-7 text-base text-gray-700 about-content"
            dangerouslySetInnerHTML={{ __html: Desc ? Desc : "" }}
          ></div>
          <br />
          <div className="">
            <div className="text-2xl pb-3 font-semibold">{"Go to"}</div>
            <ul className="text-lg leading-9 font-semibold">
              {_site.c_fourLinks?.map((element: any) => (
                <li>
                  {element?.link && element?.label && (
                    <a href={element.link}>{element.label}</a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Footer
        footerHelpSection={_site.c_footerHelpSection}
        servicesFooter={_site.c_servicesFooter}
        footerStoreLocator={_site.c_footerStoreLocator}
        customerCare={_site.c_customerCare}
        phone={_site.mainPhone}
        emailAddress={_site.c_emailAddress}
        path={updatelocale}
        _site={_site}
      />
    </>
  );
};

export default FourOhFour;
