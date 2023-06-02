import * as React from "react";
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
import favicon from "../images/favicon.png";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import BreadCrumbs from "../components/layout/BreadCrumb";
import { slugify } from "../config/globalConfig";
import { useTranslation } from "react-i18next";
import "../types/i18n";
import {
  googleMapsConfig,
  GoogleSearchConsole,
  BaseUrl,
} from "../config/globalConfig";
import { Wrapper } from "@googlemaps/react-wrapper";



/**
 * Required when Knowledge Graph data is used for a template.
 */
let currentUrl = "";
export const config: TemplateConfig = {
  stream: {
    $id: "byredo-country",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "address",
      "mainPhone",
      "slug",

      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.meta.entityType",
      "dm_directoryParents.dm_directoryParents.name",
      "dm_directoryParents.dm_directoryParents.slug",
      "dm_directoryParents.dm_directoryParents.meta.entityType",
      /* DM children */
      "dm_directoryChildren.name",
      "dm_directoryChildren.slug",
      "dm_directoryChildren.meta.entityType",
      "dm_directoryChildren.dm_baseEntityCount",
      /* DM children->children */
      "dm_directoryChildren.dm_directoryChildren.dm_baseEntityCount",
      "dm_directoryChildren.dm_directoryChildren.slug",
      "dm_directoryChildren.dm_directoryChildren.name",
      "dm_directoryChildren.dm_directoryChildren.id",
      "dm_directoryChildren.dm_directoryChildren.dm_directoryChildren.dm_baseEntityCount",
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityTypes: ["ce_country"],

    },
    // The entity language profiles that documents will be generated for.
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
      }
    });
    return `${document.meta.locale}/${currentUrl}`;
  } else {
    return `${document.meta.locale
      }/${document.slug.toString()}.html`;
  }
};


export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {

  let url = "";
  if (!document.slug) {
    const slugString = document.id + " " + document.name;
    const slug = slugify(slugString);
    url = `${slug}.html`;
  } else {
    url = `${document?.slug?.toString()}.html`;
  }

  const metaDescription = document.c_metaDescription
    ? document.c_metaDescription
    : `${document.name} | Shop Byredos Collection of Perfumes, Candles, Makeup, Leather And Body Care. Free shipping & Free returns. Complimentary samples.`;
  const metaTitle = document.c_metaTitle
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
          content: `${document.c_robotsTag ? document.c_robotsTag : "noindex, nofollow"
            }`,
        },
      },

      {
        type: "link",
        attributes: {
          rel: "canonical",
          href: `${document.c_canonical ? document.c_canonical : BaseUrl + "/" + url
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
          content: `${document.c_byradoLogo
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
          content: `${document.c_byradoLogo
            ? document.c_byradoLogo.image.url
            : "https://a.mktgcdn.com/p-sandbox/cgYD0VBchE2WzmtcTHsS1MlzQyFCTlbcmgppR7wnNE8/600x120.png"
            }`,
        },
      },
    ],
  };
};



const country: Template<TemplateRenderProps> = ({
  path,
  document,
  __meta,
}) => {
  const {
    name,
    slug,
    _site,
    address,
   

    dm_directoryParents,
    dm_directoryChildren
  } = document;

  const { i18n } = useTranslation();
  i18n.changeLanguage(document.meta.locale);
  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  let currentUrl = ""
  const myArray = path.split("/");
  currentUrl = myArray && myArray[1] + "/" + myArray[2];

  const updatelocale = (locale: any) => {
    return (window.location.pathname = `${locale}/${currentUrl}`);
  };

  const childrenDivs =
    dm_directoryChildren &&
    dm_directoryChildren.map((entity: any) => {
      let detlslug;

      if (typeof entity.dm_directoryChildren != "undefined") {
        if (entity.dm_baseEntityCount == 1) {
          entity.dm_directoryChildren &&
            entity.dm_directoryChildren.map((res: any) => {
              let name: any = res.name.toLowerCase();
              name = name.toString();
              name = name.replaceAll(" ", "-");

              if (res.slug) {
                detlslug = document.meta.locale + "/" + res.slug;
                detlslug = detlslug + ".html";
              } else {
                detlslug = res.id + "-" + name;
                detlslug =

                  document.meta.locale +
                  "/" +
                  slugify(detlslug) +
                  ".html";
              }
            });
        } else {
          dm_directoryParents &&
            dm_directoryParents.map((root: any) => {
              if (root.meta.entityType.id == "ce_root") {
                detlslug =

                  document.meta.locale +
                  "/" +
                  root.slug +
                  "/" +
                  slug +
                  "/" +
                  entity.slug +
                  ".html";
              }
            });
        }
      }

      return (
        <>
          <a key={entity.slug} href={BaseUrl + "/" + detlslug}>
            {entity.name}
            <sup className="ml-0.5">
              {entity.dm_baseEntityCount ? entity.dm_baseEntityCount : ""}
            </sup>
          </a>
        </>
      );
    });


  return (
    <>
      <Wrapper
        apiKey={googleMapsConfig.googleMapsApiKey}
        language={"en_GB"}
        libraries={["places", "geometry"]}
      >
        <Header
          ByredoLogo={_site.c_byradoLogo}
          ByredoLinks={_site.c_headerMenus}
        />


        <BreadCrumbs
          name={regionNames.of(name)}
          address={address}
          parents={dm_directoryParents}
          locale={document.meta.locale}
          
          mainparent={_site.c_relatedContinent}
        ></BreadCrumbs>


        <div className="search-form">
          <div className="text-center max-w-[38.125rem] mx-auto relative">
            <AutoSuggestions _site={_site} meta={__meta} isReload={true} />
          </div>
        </div>
        {dm_directoryChildren ? (
          <>

            <div className="directory-country py-5 lg:py-[60px]">
              <div className="container-full-width">
                <div className="directory-locations">
                  <div className="directory-location-box">
                    <div className="directory-box-inner">
                      <div className="region-name">
                        <h2>{regionNames.of(name)}</h2>
                      </div>
                      <div className="country-name">
                        {childrenDivs ? childrenDivs : ""}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}



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

export default country;
