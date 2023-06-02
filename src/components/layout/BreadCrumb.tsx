import * as React from "react";
import { BaseUrl } from "../../config/globalConfig";
import { Link } from "@yext/pages/components";
import { useTranslation } from "react-i18next";

type data = {
  name: any;
  parents: any;
  address: any;
  locale: any;
  mainparent: any;
};

const BreadCrumbs = (props: data) => {
  const [list, setList] = React.useState(null);

  let breadcrumbs;
  const data: any = [];
  React.useEffect(() => {
    setURL(props);
  }, [setList]);
  const regionNames = new Intl.DisplayNames(
    [props.locale ? props.locale : "en"],
    { type: "region" }
  );

  /* useEffect(() => {
    const timer: ReturnType<typeof setTimeout> = setTimeout(() => {}, 1000);
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []); */

  const setURL = (res: any) => {
    for (let i = 0; i < res.mainparent.length; i++) {
      data.push({
        name: `${t("Store Finder")}`,
        slug: "index",
      });
    }

    if (res.mainparent) {
      for (let i = 0; i < res.mainparent.length; i++) {
        data.push({
          name: res.mainparent[i].name,
          slug: res.mainparent[i].slug,
        });
      }
    }
    if (res.parents) {
      for (let i = 0; i < res.parents.length; i++) {
        if (res.parents[i].meta.entityType.id == "ce_country") {
          try {
            res.parents[i].name = regionNames.of(res.parents[i].name);
          } catch (error) {
            console.log("error", error);
          }
          res.parents[i].slug =
            res.parents[i - 1].slug + "/" + res.parents[i].slug;

          data.push({
            name: res.parents[i].name,
            slug: res.parents[i].slug,
          });
        } else if (res.parents[i].meta.entityType.id == "ce_city") {
          res.parents[i].slug =
            res.parents[i - 1].slug + "/" + res.parents[i].slug;
          data.push({
            name: res.parents[i].name,
            slug: res.parents[i].slug,
          });
        }
      }

      breadcrumbs = data.map((crumb: any, index: any) => (
        <li key={crumb.slug}>
          <Link
            href={BaseUrl + "/" + props.locale + "/" + crumb.slug + ".html"}
            rel="noopener noreferrer"
            eventName={"BreadCrumbs" + (index + 1)}
            style={{ color: "#3a356e" }}
          >
            {crumb.name}
          </Link>
        </li>
      ));

      setList(breadcrumbs);
    } else {
      setList(null);
    }
  };

  const { t } = useTranslation();

  return (
    <>
      <div
        className="breadcrumb"
        style={{ backgroundColor: "whitesmoke", marginTop: "10px" }}
      >
        <div className="container-full-width">
          <ul>
            <li>
              <a href="#">{t("Home")}</a>
            </li>

            {list ? (
              list
            ) : (
              <>
                {props.address && props.address.city ? (
                  <li>
                    {" "}
                    <a
                      href={props.address.city + ".html"}
                      style={{ color: "#3a356e" }}
                    >
                      {props.address.city ? props.address.city : ""}
                    </a>
                  </li>
                ) : (
                  <></>
                )}
              </>
            )}

            <li style={{ color: "#3a356e" }}>{props && props.name}</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default BreadCrumbs;
