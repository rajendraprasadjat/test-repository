/* eslint-disable react/prop-types */
import * as React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Continent from "../components/dm/Continent";
import BreadCrumbs from "../components/layout/BreadCrumb";
import { useTranslation } from "react-i18next";
import { googleMapsConfig, slugify } from "../config/globalConfig";
import "../index.css";
import "../types/i18n";
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

export const config: TemplateConfig = {
  stream: {
    $id: "all-address",

    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "slug",
      "c_children.name",
      "c_children.slug",
      "c_children.dm_directoryChildren.name",
      "c_children.dm_directoryChildren.slug",
      "c_children.dm_directoryChildren.dm_baseEntityCount",
      "c_children.dm_directoryChildren.dm_directoryChildren.name",
      "c_children.dm_directoryChildren.dm_directoryChildren.slug",
      "c_children.dm_directoryChildren.dm_directoryChildren.dm_baseEntityCount",
      
      "c_children.dm_directoryChildren.dm_directoryChildren.dm_directoryChildren.name",
      "c_children.dm_directoryChildren.dm_directoryChildren.dm_directoryChildren.id",
      "c_children.dm_directoryChildren.dm_directoryChildren.dm_directoryChildren.slug",
      "c_children.dm_directoryChildren.dm_directoryChildren.dm_directoryChildren.dm_baseEntityCount",
    ],
    filter: {
      entityTypes: ["ce_continents"],
    },
    localization: {
      locales: ["fr-FR", "en_GB", "it-IT", "ja-JP", "de-DE"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  let url = `${document.meta.locale}/${document.slug?.toString()}.html`;
  if (!document.slug) {
    let slugString = document.id + "-" + document.name;
    slugString = slugify(slugString);
    url = `${document.meta.locale}/${slugString}.html`;
  }
  return url;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

const Root: Template<TemplateRenderProps> = ({
  path,
  document,
  __meta,
}) => {
  const { _site, c_children } = document;

  const { name } = document;
  const {i18n } = useTranslation();
   i18n.changeLanguage(document.meta.locale);
  let currentUrl = "";
  const myArray = path.split("/");
  currentUrl = myArray && myArray[1];
  const updatelocale = (locale: any) => {
    return (window.location.pathname = `${locale}/${currentUrl}`);
  };
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
        name={name}
        address={""}
        locale={document.meta.locale}
        parents={undefined}
        
        mainparent={_site.c_relatedContinent}
      />
      <div className="search-form">
        <div className="text-center max-w-[38.125rem] mx-auto relative">
       <AutoSuggestions _site={_site} meta={__meta} isReload={true}/>
        </div>
      </div>
      <div className="directory-country py-5 lg:py-[60px]">
        <Continent
          child={c_children}       
          locale={document.meta.locale}
          document={document.meta}
         
        />
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

export default Root;
