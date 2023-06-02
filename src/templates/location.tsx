/* eslint-disable no-prototype-builtins */
/* eslint-disable react/prop-types */
/**
 * This is an example of how to create a template that makes use of streams data.
 * The stream data originates from Yext's Knowledge Graph. When a template in
 * concert with a stream is built by the Yext Sites system, a static html page
 * is generated for every corresponding (based on the filter) stream document.
 *
 * Another way to think about it is that a page will be generated using this
 * template for every eligible entity in your Knowledge Graph.
 */
import * as React from "react";
import { useTranslation } from "react-i18next";
import BreadCrumbs from "../components/layout/BreadCrumb";
import NearByLocation from "../components/locationDetails/NearByLocation";
import { nearByLocation } from "../types/nearByLocation";
import { fetch } from "@yext/pages/util";
import favicon from "../images/favicon.png";
import { JsonLd } from "react-schemaorg";
import LocationInformation from "../components/locationDetails/LocationInformation";
import MapImage from "../components/locationDetails/MapImage";
import Promotion from "../components/locationDetails/Promotion";
import "../types/i18n";
import {
  AnalyticsProvider,
  AnalyticsScopeProvider,
  Link,
} from "@yext/pages/components";
import PhotoSlider from "../components/locationDetails/PhotoSlider";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import About from "../components/locationDetails/AboutWell";
import {
  AnswerExperienceConfig,
  GoogleSearchConsole,
  BaseUrl,
  AnalyticsEnableDebugging,
  AnalyticsEnableTrackingCookie,
} from "../config/globalConfig";
import {
  entityTypes,
  ByredoSocialMediaUrls,
} from "../config/globalConfig";
import "../index.css";
import {
  Template,
  GetPath,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  TransformProps,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
import { slugify } from "../config/globalConfig";

/**
 * Required when Knowledge Graph data is used for a template.
 */

export const config: TemplateConfig = {
  stream: {
    $id: "location",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "address",
      "hours",
      "slug",
      "mainPhone",
      "geomodifier",
      "yextDisplayCoordinate",
      "c_mapImage",
      "c_promotionalProducts",
      "timezone",
      "c_categoriesProducts",
      "additionalHoursText",
    
      /*About Byredo*/
      "c_image",
      "c_title",
      "c_readMore",
      "description",
      "c_photoGalleryTitle",
      
      /*seo*/
      "c_canonicalURL",
      "c_metaDescription",
      "c_metaTitle",
      "c_robotsTag",

       /*Filter*/
       "c_servicesTitle",
       "c_byredoServices",
       "c_productCatagoriesTitle",
       "c_productCatagories",
       "c_storeType",
       "c_storeTypesTitle",

      //  /*Directory Manager*/
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.meta.entityType",
      "dm_directoryChildren.name",
      "dm_directoryChildren.address",
      "dm_directoryChildren.slug",
      "dm_directoryChildren.dm_directoryChildren.name",
      "dm_directoryChildren.dm_baseEntityCount",
      "dm_directoryChildren.dm_directoryChildren.slug",
      "dm_directoryChildren.dm_directoryChildren.dm_baseEntityCount",
      "dm_directoryChildren.dm_directoryChildren.meta.entityType",
      "dm_directoryChildren.dm_directoryChildren.dm_directoryChildren.name",
      "dm_directoryChildren.dm_directoryChildren.dm_directoryChildren.slug",
      "dm_directoryChildren.dm_directoryChildren.dm_directoryChildren.id"
    ],

    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityTypes: [entityTypes],
    },

    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["fr-FR", "en_GB", "it-IT", "ja-JP", "de-DE"],
      primary: false,
    },
  },
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
export const getPath: GetPath<TemplateProps> = ({ document }) => {
  let url = `${document?.meta?.locale}/${document?.slug}.html`;
  if (!document.slug) {
    let slugString = document.id + "-" + document.name;
    slugString = slugify(slugString);
    url = `${document?.meta?.locale}/${slugString}.html`;
  }
  return url;
};

/**
 * Defines a list of paths which will redirect to the path created by getPath.
 *
 * NOTE: This currently has no impact on the local dev path. Redirects will be setup on
 * a new deploy.
 */
// export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
//   return [`index-old/${document.id.toString()}`];
// };

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  let url = "";
  if (!document.slug) {
    const slugString = document.id + " " + document.name;
    const slug = slugify(slugString);
    url = `${slug}.html`;
  } else {
    url = `${document.slug?.toString()}.html`;
  }
  // <meta name="google-site-verification" content="WIqhwAw2ugRAKEYRRqis1ZfUBbnWe_AXSoDltHceCbI" />
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

type ExternalApiData = TemplateProps & { externalApiData: nearByLocation };
export const transformProps: TransformProps<ExternalApiData> = async (
  data: any
) => {
  const latitude = data?.document?.yextDisplayCoordinate?.latitude;
  const longitude = data?.document?.yextDisplayCoordinate?.longitude;
const url = `${AnswerExperienceConfig.endpoints.verticalSearch}?experienceKey=${AnswerExperienceConfig.experienceKey}&api_key=${AnswerExperienceConfig.apiKey}&v=20220511&version=${AnswerExperienceConfig.experienceVersion}&locale=${data.document.meta.locale}&location=${latitude},${longitude}&verticalKey=${AnswerExperienceConfig.verticalKey}&limit=4&retrieveFacets=true&skipSpellCheck=false&session_id=12727528-aa0b-4558-9d58-12a815eb3761&sessionTrackingEnabled=true&source=STANDARD`;
  const externalApiData = (await fetch(url).then((res: any) =>
    res.json()
  )) as nearByLocation;
  return { ...data, externalApiData };

};

type ExternalApiRenderData = TemplateRenderProps & {
  externalApiData: nearByLocation;
};
const Location: Template<ExternalApiRenderData> = ({
  relativePrefixToRoot,
  externalApiData,
  path,
  document,
}) => {
  const {
    _site,
    name,
    id,
    address,
    hours,
    slug,
    mainPhone,
    __meta,
    additionalHoursText,
    yextDisplayCoordinate,
    timezone,
    c_promotionalProducts,
    c_title,
    description,
    c_categoriesProducts,
    c_image,
    c_readMore,
    c_canonicalURL,
    c_photoGalleryTitle,
    c_mapImage,
    c_storeType,
    c_storeTypesTitle,
    c_servicesTitle,
    c_byredoServices,
    c_productCatagoriesTitle,
    c_productCatagories,
    dm_directoryParents
  } = document;
  const templateData = { document: document, __meta: __meta };
  const hoursSchema = [];
  for (const key in hours) {
    if (hours.hasOwnProperty(key)) {
      let openIntervalsSchema:any = "";
      if (key !== "holidayHours") {
        if (hours[key].isClosed) {
          openIntervalsSchema = {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "key",
          };
        } else {
          let end = "";
          let start = "";
          if (typeof hours[key].openIntervals != "undefined") {
            const openIntervals = hours[key].openIntervals;
            for (const o in openIntervals) {
              if (openIntervals.hasOwnProperty(o)) {
                end = openIntervals[o].end;
                start = openIntervals[o].start;
              }
            }
          }
          openIntervalsSchema = {
            "@type": "OpeningHoursSpecification",
            closes: end,
            dayOfWeek: key,
            opens: start,
          };
        }
      } 
      hoursSchema.push(openIntervalsSchema);
    }
  }

  const { i18n } = useTranslation();
  i18n.changeLanguage(document.meta.locale);
  let currentUrl = ""
  const myArray = path.split("/");
  if (!document.slug) {
    let slugString = document.id + "-" + document.name;
    slugString = slugify(slugString)+".html";
    currentUrl = myArray && slugString;
  }else
  {
    let slugString = document.slug;
    slugString = slugify(slugString)+".html";
    currentUrl = myArray && slugString;
  }
  const updatelocale = (locale: any) => {
    return (window.location.pathname = `${locale}/${currentUrl}`);
  };
  return (
    <>
      <JsonLd<Location>
        item={{
          "@context": "https://schema.org",
          "@type": "Store",
          name: document?.name ? document?.name : "Byredo",
          image: `${document.c_byradoLogo
            ? document?.c_byradoLogo?.image?.url
            : "https://a.mktgcdn.com/p-sandbox/cgYD0VBchE2WzmtcTHsS1MlzQyFCTlbcmgppR7wnNE8/600x120.png"
            }`,
          url: `${c_canonicalURL ? c_canonicalURL : BaseUrl}/${slug ? slug : `${id}-${name}`
            }.html`,
          telephone: mainPhone,
          address: {
            "@type": "PostalAddress",
            streetAddress: address.line1,
            addressLocality: address.city,
            addressRegion: address.region,
            postalCode: address.postalCode,
            addressCountry: address.countryCode,
          },
          openingHoursSpecification: hoursSchema,
          sameAs: [
            ByredoSocialMediaUrls.facebook,
            ByredoSocialMediaUrls.instagram,
          ],
          geo: {
            "@type": "GeoCoordinates",
            latitude: document?.yextDisplayCoordinate?.latitude,
            longitude: document?.yextDisplayCoordinate?.longitude,
          },
        }}
      />

      <AnalyticsProvider
        templateData={templateData}
        enableDebugging={AnalyticsEnableDebugging}
        enableTrackingCookie={AnalyticsEnableTrackingCookie}
      >
        <AnalyticsScopeProvider name={""}>

          <Header
            ByredoLogo={_site.c_byradoLogo}
            ByredoLinks={_site.c_headerMenus}
          />
            <BreadCrumbs
            name={name}
            parents={dm_directoryParents}
            address={address}
            locale={document.meta.locale}
            mainparent={_site.c_relatedContinent}
          ></BreadCrumbs> 

          <LocationInformation
            prop={hours}
            coords={yextDisplayCoordinate}
            address={address}
            phone={mainPhone}
            timezone={timezone}
            hours={hours}
            additionalHoursText={additionalHoursText}
            site={_site}
            name={name}
           
          />
          {(c_mapImage || c_storeType) &&
          <MapImage image={c_mapImage}
            services={c_byredoServices}
            servicesTitle={c_servicesTitle}
            storeType={c_storeType}
            storeTypesTitle={c_storeTypesTitle}
            productCatagories={c_productCatagories}
            productCatagoriesTitle={c_productCatagoriesTitle}
          />
}
          <div className="mt-8 md:mt-10">
            {c_title && (
              <About
                storeDescriptionTitle={c_title}
                storeDescriptionImage={c_image}
                storeDescriptionText={description}
                storeDescriptionCTA={c_readMore}
              />
            )}
          </div>
          {c_categoriesProducts && c_photoGalleryTitle && (
            <PhotoSlider
              photos= {c_categoriesProducts}
              photoGalleryTitle={c_photoGalleryTitle}
             
            />
          )}
          {c_promotionalProducts && (
            <Promotion
              promo={c_promotionalProducts}

            />
          )}

          <NearByLocation
            prop={externalApiData}
            baseUrl={relativePrefixToRoot}
            coords={yextDisplayCoordinate}
            slug={slug}
            timezone={timezone}
            site={_site}
          />
          <div className="find-more more-location">
            <Link className="button" href={BaseUrl+"/" + document.meta.locale + "/index.html"}>

              {_site.c_viewMoreLocations}
            </Link>
          </div>
          <Footer
            footerHelpSection={_site.c_footerHelpSection}
            servicesFooter={_site.c_servicesFooter}
            footerStoreLocator={_site.c_footerStoreLocator}
            customerCare={_site.c_customerCare}
            phone={_site.mainPhone}
            emailAddress={_site.c_emailAddress} path={updatelocale}
            _site={_site}
            meta={__meta}
          />
        </AnalyticsScopeProvider>
      </AnalyticsProvider>
    </>
  );
};
export default Location;
