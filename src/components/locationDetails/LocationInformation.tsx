import * as React from "react";
import CustomMap from "./CustomMap";
import getDirectionUrl from "../common/GetDirection";
import { Link } from "@yext/pages/components";
import Holidayhour from "./holidayHours";
import Address from "../common/Address";
import Phone from "../common/Phone";
import { useState } from "react";
import Modal from "react-modal";
import { defaultTimeZone } from "../../config/globalConfig";
import Hours from "../common/Hours";
import { useTranslation } from "react-i18next";

type props = {
  prop: any;
  coords: number;
  address: string;
  phone: number;
  timezone: any;
  hours: any;
  additionalHoursText: any;
  site: any;
  name: string;
};
const LocationInformation = (data: props) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  function openModal() {
    document.body.classList.add("overflow-hidden");
    setIsOpen(true);
  }

  function closeModal() {
    document.body.classList.remove("overflow-hidden");
    setIsOpen(false);
  }

  function handleCloseModal() {
    document.body.classList.remove("overflow-hidden");
    setIsOpen(false);
  }

  const [coordinates, setCoordinate] = React.useState({});
  const [timezone, setTimeZone] = React.useState("");
  const [isShow, setIsShow] = React.useState(false);
  const array: any = [];
  React.useEffect(() => {
    const date = new Date();
    const Day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const currentDate = `${year}-${month}-${Day}`;
    data?.prop?.holidayHours &&
      data?.prop?.holidayHours.map((i: any) => {
        const d1 = new Date(`${currentDate}`);
        const d2 = new Date(`${i.date}`);
        if (d2.getTime() >= d1.getTime()) {
          array.push(i);
        }
      });
    if (array.length > 0) {
      setIsShow(true);
    }
    setCoordinate(data.coords);
    setTimeZone(data.timezone);
  }, []);

  const { t } = useTranslation();
  return (
    <>
      <div className="location-detail-sec">
        <div className="container-lg">
          <div className="boxes">
            <div className="box store-info">
              <div className="inner-box">
                <h4 className="box-title">{data.name}</h4>
                <div className="address-innerbx">
                  <div className="address-left">
                    <Address address={data.address}></Address>
                    <Phone phone={data.phone} />
                  </div>
                </div>

                <div className="icon-row direction-button">
                  <Link
                    data-ya-track="getdirections"
                    eventName={`getdirections`}
                    className="direction button before-icon"
                    onClick={(e) => {
                      e.preventDefault();
                      getDirectionUrl(data);
                    }}
                    href="/"
                    rel="noopener noreferrer"
                  >
                    {data.site.c_getDirections}
                  </Link>
                </div>
              </div>
            </div>

            {data?.prop && (
              <>
                {Object.keys(data?.hours).length > 1 && (
                  <>
                    <div className="box store-timing">
                      <div className="inner-box">
                        <h4 className="box-title">
                          {data.site.c_storeHours
                            ? data.site.c_storeHours
                            : t("Opening Hours")}
                        </h4>
                        <div className="daylist">
                          <Hours
                            hours={data?.hours}
                            timezone={timezone ? timezone : defaultTimeZone}
                            site={data?.site}
                            additionalHoursText={data.additionalHoursText}
                          />
                          {data?.prop?.holidayHours &&
                            isShow &&
                            !data?.prop?.reopenDate && (
                              <>
                                <button
                                  className="current-location pharmacy-serv-head hide-mob link-line-text"
                                  onClick={openModal}
                                >
                                  {data?.site?.c_holidayHoursCalendar}
                                </button>
                              </>
                            )}
                          {modalIsOpen && (
                            <Modal
                              onRequestClose={handleCloseModal}
                              shouldCloseOnOverlayClick={true}
                              isOpen={modalIsOpen}
                              style={customStyles}
                            >
                              <a
                                onClick={closeModal}
                                type="button"
                                id="closeButton"
                                data-modal-toggle="allergens-pdf"
                                className="closeButton bg-closeIcon bg-no-repeat bg-center w-7 h-7 bg-[length:48px]"
                              >
                                <svg
                                  xmlns="http:www.w3.org/2000/svg"
                                  width="20.953"
                                  height="20.953"
                                  viewBox="0 0 20.953 20.953"
                                >
                                  <path
                                    id="Icon_ionic-md-close"
                                    data-name="Icon ionic-md-close"
                                    d="M28.477,9.619l-2.1-2.1L18,15.9,9.619,7.523l-2.1,2.1L15.9,18,7.523,26.381l2.1,2.1L18,20.1l8.381,8.381,2.1-2.1L20.1,18Z"
                                    transform="translate(-7.523 -7.523)"
                                    fill="#B1B1B1"
                                  />
                                </svg>
                              </a>
                              <h3 className="holiday-title">
                                {data.site.c_holidayHoursCalendar}
                              </h3>
                              <div className="pop-up-holyhrs heading">
                                <div>{data.site.c_date}</div>
                                <div>{data.site.c_day}</div>
                                <div>{data.site.c_openingHours}</div>
                              </div>
                              <Holidayhour hours={data.hours.holidayHours} />
                            </Modal>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}

            {data?.prop ? (
              <>
                {Object.keys(data?.hours).length > 1 ? (
                  <>
                    <div className="box map-info">
                      <div className="inner-box">
                        <CustomMap prop={coordinates} />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="box map-info without-hours">
                      <div className="inner-box">
                        <CustomMap prop={coordinates} />
                      </div>
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                <div className="box map-info without-hours">
                  <div className="inner-box">
                    <CustomMap prop={coordinates} />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default LocationInformation;
