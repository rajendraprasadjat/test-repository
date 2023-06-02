import * as React from "react";
import { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
function LocalesDropdown(props: any) {
  const [language, setLanguage] = useState("");
  const [section, setSection] = useState(0);
  const onLanguageChange = (e: any) => {
    setLanguage(e.target.value);
    props.updatelocale(e.target.value);
  };

  /**
   * For country and language dropdown
   * @param e
   * returns the HTML element of Countries and Languages in dropdown format
   */

  const handleClick = (e: any) => {
    setSection(e.target.value);
    setLanguage(props.country[e.target.value].language[0].languageCode);
    props.updatelocale(props.country[e.target.value].language[0].languageCode);
  };
  useEffect(() => {
    const result = props.country?.filter((res: any, index: number) => {
      return (
        res.language &&
        res.language.map((inr: any) => {
          if (inr.languageCode === props.site.meta.locale) {
            setLanguage(inr.languageCode);
            return (res.index = index);
          }
        })
      );
    });
    const finalresult =
      result &&
      result.filter((res: any) => {
        if (Object.prototype.hasOwnProperty.call(res, "index")) {
          return res;
        }
      });
    setSection(finalresult[0].index);
  }, []);

  return (
    <div className="languagedropdown">
      <form>
        <select onChange={(e) => handleClick(e)} value={section}>
          {props.country?.map((e: any, ind: any) => {
            return (
              <option value={ind} key={ind}>
                {e.country}
              </option>
            );
          })}
        </select>
        <select
          onChange={(e) => onLanguageChange(e)}
          value={language}
          className="language"
        >
          {props.country[section].language?.map((el: any, indd: number) => {
            return (
              <option value={el.languageCode} key={indd}>
                {el.language}
              </option>
            );
          })}
        </select>
      </form>
    </div>
  );
}

export default withTranslation()(LocalesDropdown);
