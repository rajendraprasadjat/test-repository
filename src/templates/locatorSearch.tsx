import * as React from "react";
import { useTranslation } from "react-i18next";
import "../types/i18n";
import "../index.css";
import {
  GetPath,
  Template,
  TemplateProps,
  TemplateRenderProps,
  TemplateConfig,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
import { SearchHeadlessProvider } from "@yext/search-headless-react";
import Header from "../components/layout/Header";
import { JsonLd } from "react-schemaorg";
import favicon from "../images/favicon.png";
import SearchLayout from "../components/locatorPage/SearchLayout";
import {
  AnswerExperienceConfig,
  GoogleSearchConsole,
  BaseUrl,
  AnalyticsEnableDebugging,
  AnalyticsEnableTrackingCookie,
} from "../config/globalConfig";
import LocatorBread from "../components/locatorPage/LocatorBread";
import Footer from "../components/layout/Footer";
import {
  AnalyticsProvider,
  AnalyticsScopeProvider,
} from "@yext/pages/components";
import { Schema } from "../types/types";

interface TemplateRenderPropsCustom extends TemplateRenderProps {
  path: string;
  __meta: any;
  document: any;
}

export const config: TemplateConfig = {
  stream: {
    $id: "locatorSearch",
    filter: {
      entityIds: ["global-data"],
    },
    fields: [
      "id",
      "uid",
      "meta",

      /*Header*/
      "c_headerMenus",
      "c_byradoLogo",

      /*Footer*/
      "c_footerHelpSection",
      "c_servicesFooter",
      "c_footerStoreLocator",
      "c_customerCare",
      "mainPhone",
      "c_emailAddress",

      /*Seo*/
      "c_metaTitle",
      "c_metaDescription",
      "c_canonicalURL",
      "c_robotsTag",
    ],
    localization: {
      locales: ["en_GB", "fr-FR", "it-IT", "ja-JP", "de-DE"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  let url = `${document.meta.locale}/index.html`;
  if (document.meta.locale === "en_GB") {
    url = `index.html`;
  }
  return url;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  path,
  document,
}): HeadConfig => {
  // <meta name="google-site-verification" content="WIqhwAw2ugRAKEYRRqis1ZfUBbnWe_AXSoDltHceCbI" />
  const metaDescription = document.c_metaDescription
    ? document.c_metaDescription
    : `${document.name} | Shop Byredos Collection of Perfumes, Candles, Makeup, Leather And Body Care. Free shipping & Free returns. Complimentary samples.`;
  const metaTitle = document.c_metaTitle
    ? document.c_metaTitle
    : `${document.name} - Stores in Everyone`;

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
          name: "description",
          content: `${metaDescription}`,
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
            document._site.c_robotsTag
              ? document._site.c_robotsTag
              : "noindex, nofollow"
          }`,
        },
      },

      {
        type: "link",
        attributes: {
          rel: "canonical",
          href: `${
            document.c_canonical ? document.c_canonical : `${BaseUrl}/${path}`
          }`,
        },
      },
      // og tags
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
          content: `${BaseUrl}/${path}`,
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
      // twitter tag
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
          name: "twitter:card",
          content: "summary",
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:url",
          content: `${BaseUrl}/${path}`,
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

const LocatorSearch: Template<TemplateRenderProps> = ({
  path,
  __meta,
  document,
}: TemplateRenderPropsCustom) => {
  const { _site } = document;
  const _Site = _site;
  const templateData = { document, __meta };
  const { i18n } = useTranslation();
  i18n.changeLanguage(`${document.meta.locale}`);

  const updateLocale = (locale: any) => {
    let currentUrl = "";
    const myArray = path.split("/");
    currentUrl = myArray && myArray[1];
    i18n.changeLanguage(`${locale}`);
    return (window.location.pathname = `${locale}/${currentUrl}`);
  };

  return (
    <>
      <JsonLd<Schema>
        item={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Byredo",
          url: `${BaseUrl}/${path}`,
          logo: `${
            document.c_byradoLogo
              ? document.c_byradoLogo.image.url
              : "https://a.mktgcdn.com/p-sandbox/cgYD0VBchE2WzmtcTHsS1MlzQyFCTlbcmgppR7wnNE8/600x120.png"
          }`,
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
          <LocatorBread site={_Site} />

          <SearchHeadlessProvider
            experienceKey={AnswerExperienceConfig.experienceKey}
            locale={document.meta.locale}
            apiKey={AnswerExperienceConfig.apiKey}
            verticalKey={AnswerExperienceConfig.verticalKey}
            experienceVersion={AnswerExperienceConfig.experienceVersion}
            sessionTrackingEnabled={
              AnswerExperienceConfig.sessionTrackingEnabled
            }
            endpoints={AnswerExperienceConfig.endpoints}
          >
            <SearchLayout _site={_Site} meta={__meta} />
         
          </SearchHeadlessProvider>
          <Footer
            footerHelpSection={_site.c_footerHelpSection}
            servicesFooter={_site.c_servicesFooter}
            footerStoreLocator={_site.c_footerStoreLocator}
            customerCare={_site.c_customerCare}
            phone={_site.mainPhone}
            emailAddress={_site.c_emailAddress}
            path={updateLocale}
            _site={_site}
            meta={__meta}
          />
        </AnalyticsScopeProvider>
      </AnalyticsProvider>
    </>
  );
};
export default LocatorSearch;
