/* eslint-disable react/jsx-key */
/* eslint-disable no-var */
/* eslint-disable prefer-const */
/* eslint-disable react/prop-types */
import * as React from "react";
import getDirectionUrl from "../components/common/GetDirection";
import favicon from "../images/favicon.png";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import BreadCrumbs from "../components/layout/BreadCrumb";
import { googleMapsConfig, slugify } from "../config/globalConfig";
import OpenCloseStatus from "../components/common/OpenCloseStatus";
import { useTranslation } from "react-i18next";
import Address from "../components/common/Address";
import { Link } from "@yext/pages/components";
import "../types/i18n";
import {
  defaultTimeZone,
  GoogleSearchConsole,
  BaseUrl,
} from "../config/globalConfig";

import "../index.css";

import {
  Template,
  GetPath,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
import AutoSuggestions from "../components/common/AutoSuggestions";
import { Wrapper } from "@googlemaps/react-wrapper";

var currentUrl = "";
export const config: TemplateConfig = {
  stream: {
    $id: "city",
    filter: {
      entityTypes: ["ce_city"],
    },
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "slug",
      "address",
      "timezone",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.meta.entityType",
      "dm_directoryParents.dm_directoryParents.name",
      "dm_directoryParents.dm_directoryParents.slug",
      "dm_directoryParents.dm_directoryParents.meta.entityType",
      /* DM children */
      "dm_directoryChildren.name",
      "dm_directoryChildren.meta.entityType",
      /* DM children->children */
      "dm_directoryChildren.dm_directoryChildren.dm_baseEntityCount",
      "dm_directoryChildren.dm_directoryChildren.slug",
      "dm_directoryChildren.dm_directoryChildren.name",
      "dm_directoryChildren.dm_directoryChildren.id",
      "dm_directoryChildren.dm_directoryChildren.dm_directoryChildren.dm_baseEntityCount",

      "dm_directoryChildren.mainPhone",
      "dm_directoryChildren.slug",
      "dm_directoryChildren.id",
      "dm_directoryChildren.dm_baseEntityCount",
      "dm_directoryChildren.address",
      "dm_directoryChildren.timezone",
      "dm_directoryChildren.hours",
      "dm_directoryChildren.yextDisplayCoordinate",
    ],
    localization: {
      locales: ["fr-FR", "en_GB", "it-IT", "ja-JP", "de-DE"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  if (document.dm_directoryParents) {
    document.dm_directoryParents.map((i: any) => {
      if (i.meta.entityType.id == "ce_root") {
        currentUrl = `${i.slug}/${document.slug.toString()}.html`;
      } else if (i.meta.entityType.id == "ce_country") {
        let url = `${document.dm_directoryParents[0]?.slug}/${
          i.slug
        }/${document.slug.toString()}.html`;
        currentUrl = url;
      }
    });
    return `${document.meta.locale}/${currentUrl}`;
  } else {
    return `${document.meta.locale}/${document.slug.toString()}.html`;
  }
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  let url = "";
  if (!document.slug) {
    let slugString = document.id + " " + document.name;
    let slug = slugify(slugString);
    url = `${slug}.html`;
  } else {
    url = `${document.slug.toString()}.html`;
  }
  let metaDescription = document.c_metaDescription
    ? document.c_metaDescription
    : `${document.name} | Shop Byredos Collection of Perfumes, Candles, Makeup, Leather And Body Care. Free shipping & Free returns. Complimentary samples.`;
  let metaTitle = document.c_metaTitle
    ? document.c_metaTitle
    : `${document.name} | BYREDO Official Site | Perfumes, Candles & Body Care`;
  return {
    title: metaTitle,
    charset: "UTF-8",
    viewport:
      "width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1, user-scalable=0",
    tags: [
      {
        type: "meta",
        attributes: {
          name: GoogleSearchConsole.name,
          content: GoogleSearchConsole.content,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "description",
          content: `${metaDescription}`,
        },
      },
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
          name: "author",
          content: "Byredo",
        },
      },
      {
        type: "meta",
        attributes: {
          name: "robots",
          content: `${
            document.c_robotsTag ? document.c_robotsTag : "noindex, nofollow"
          }`,
        },
      },

      {
        type: "link",
        attributes: {
          rel: "canonical",
          href: `${
            document.c_canonical ? document.c_canonical : BaseUrl + "/" + url
          }`,
        },
      },

      //og tag
      {
        type: "meta",
        attributes: {
          property: "og:title",
          content: `${metaTitle}`,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:description",
          content: `${metaDescription}`,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:url",
          content: BaseUrl + "/" + url,
        },
      },

      {
        type: "meta",
        attributes: {
          property: "og:image",
          content: `${
            document.c_byradoLogo
              ? document.c_byradoLogo.image.url
              : "https://a.mktgcdn.com/p-sandbox/cgYD0VBchE2WzmtcTHsS1MlzQyFCTlbcmgppR7wnNE8/600x120.png"
          }`,
        },
      },
      //twitter tag
      {
        type: "meta",
        attributes: {
          property: "twitter:title",
          content: `${metaTitle}`,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:description",
          content: `${metaDescription}`,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:card",
          content: "summary",
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:url",
          content: BaseUrl + "/" + url,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:image",
          content: `${
            document.c_byradoLogo
              ? document.c_byradoLogo.image.url
              : "https://a.mktgcdn.com/p-sandbox/cgYD0VBchE2WzmtcTHsS1MlzQyFCTlbcmgppR7wnNE8/600x120.png"
          }`,
        },
      },
    ],
  };
};

const City: Template<TemplateRenderProps> = ({ path, document, __meta }) => {
  const { name, dm_directoryParents, dm_directoryChildren, _site } = document;
  let currentUrl = "";
  const myArray = path.split("/");
  currentUrl = myArray && myArray[1] + "/" + myArray[2] + "/" + myArray[3];
  const updatelocale = (locale: any) => {
    return (window.location.pathname = `${locale}/${currentUrl}`);
  };
  const childrenDivs = dm_directoryChildren?.map((entity: any) => {
    let url = "";
    let country: any = entity?.address?.countryCode?.toLowerCase();
    let name: any = entity?.name?.toLowerCase();
    let region: any = entity?.address?.region?.toLowerCase();
    let initialregion: any = region?.toString();
    let finalregion: any = initialregion?.replaceAll(" ", "-");
    let city: any = entity?.address?.city?.toLowerCase();
    let initialrcity: any = city?.toString();
    let finalcity: any = initialrcity?.replaceAll(" ", "-");

    let string: any = name?.toString();
    let result: any = string?.replace(/\s+/g, "-");
    if (!entity.slug) {
      url =
        "/" +
        country +
        "/" +
        finalregion +
        "/" +
        finalcity +
        "/" +
        entity.id +
        "-" +
        result +
        ".html";
    } else {
      url = document.meta.locale + "/" + entity.slug?.toString() + ".html";
    }

    const { t, i18n } = useTranslation();
    i18n.changeLanguage(`${document.meta.locale}`);
    return (
      <div className="bg-white shadow-lg box_shadow drop-shadow-md">
        <div className="flex justify-between items-center pt-3 ml-4">
          <h5 className="underline underline-offset-8 font-bold">
            <Link
              className="inline-block notHighlight"
              href={BaseUrl + "/" + url}
              data-ya-track={`${entity.name}`}
              eventName={`${entity.name}`}
              rel="noopener noreferrer"
            >
              {entity.name}
            </Link>
          </h5>
        </div>

        <div className="flex mt-4 ml-4">
          <div className="add-city">
            <Address address={entity.address} />
          </div>
        </div>

        <div className="flex mt-4 ml-4">
          <p className="text-sm pl-4">
            <a href={`tel:${entity.mainPhone}`}>{entity.mainPhone}</a>
          </p>
        </div>

        {entity.hours && (
          <>
            {Object.keys(entity?.hours).length > 0 && (
              <>
                <div className="single-line">
                  <OpenCloseStatus
                    timezone={
                      entity.timezone ? entity.timezone : defaultTimeZone
                    }
                    hours={entity.hours}
                    site={_site}
                  ></OpenCloseStatus>
                </div>
              </>
            )}
          </>
        )}

        <div className="buttons gap-y-[2px] sm:gap-y-2.5 py-5 pr-[2.25rem]">
          <div className="ctaBtn">
            <Link className="button before-icon" href={BaseUrl + "/" + url}>
              {_site.c_viewStationDetails
                ? _site.c_viewStationDetails
                : t("View Details")}
            </Link>
          </div>
          <div className="ctaBtn">
            <Link
              data-ya-track="getdirections"
              eventName={`getdirections`}
              className="direction button before-icon"
              onClick={(e) => {
                e.preventDefault();
                getDirectionUrl(entity);
              }}
              href="/"
              rel="noopener noreferrer"
            >
              {_site.c_getDirections
                ? _site.c_getDirections
                : t("Get Direction")}
            </Link>
          </div>
        </div>
      </div>
    );
  });

  let url: any = "";

  document.dm_directoryParents?.map((i: any) => {
    if (i.meta.entityType.id == "ce_country") {
      url = `${i.slug}`;
    } else if (i.meta.entityType.id == "ce_region") {
      url = `${url}/${i.slug}/${document.slug?.toString()}.html`;
    }
  });
  let breadcrumbScheme: any = [];
  let currentIndex: any = 0;
  dm_directoryParents &&
    dm_directoryParents?.map((i: any, index: any) => {
      currentIndex = index;
      if (index != 0) {
        breadcrumbScheme.push({
          "@type": "ListItem",
          position: index,
          item: {
            "@id": `${BaseUrl}${i.slug}`,
            name: i.name,
          },
        });
      }
    });

  breadcrumbScheme.push({
    "@type": "ListItem",
    position: currentIndex + 1,
    item: {
      "@id": `${BaseUrl}/${document.slug?.toString()}.html`,
      name: document.name,
    },
  });

  return (
    <>
      <Wrapper
        apiKey={googleMapsConfig.googleMapsApiKey}
        language={document.meta.locale}
        libraries={["places", "geometry"]}
      >
        <Header
          ByredoLogo={_site.c_byradoLogo}
          ByredoLinks={_site.c_headerMenus}
        />
        {dm_directoryParents && (
          <>
            <BreadCrumbs
              name={document.name}
              parents={dm_directoryParents}
              address={""}
              locale={document.meta.locale}
              mainparent={_site.c_relatedContinent}
            ></BreadCrumbs>
          </>
        )}
        <div className="search-form">
          <div className="text-center max-w-[38.125rem] mx-auto relative">
            <AutoSuggestions _site={_site} meta={__meta} isReload={true} />
          </div>
        </div>

        <div className="content-list city-page">
          <div className="container mx-auto">
            <div className="sec-title text-center">
              <h2>{name}</h2>
            </div>
            <div className="flex flex-wrap justify-center items-start -mx-2.5 lg:-mx-[.9375rem] gap-12">
              {childrenDivs}
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
      </Wrapper>
    </>
  );
};
export default City;
