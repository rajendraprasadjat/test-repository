import * as React from "react";
import Modal from "react-modal";
import { useTranslation } from "react-i18next";
import UseMyLocationIcon from "../../svg_icons/UseMyLocationIcon";

type props = {
  useMyLocation: any;
  onClick: any;
  allowlocation: any;
  modelopen: any;
  setModelOpen: any;
};

const UsemylocationPopup = (data: props) => {
  const closeModal = () => {
    document.body.classList.remove("overflow-hidden");
    data.setModelOpen(false);
  };
  const handleCloseModal = () => {
    document.body.classList.remove("overflow-hidden");
    data.setModelOpen(false);
  };
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

  const { t } = useTranslation();
  return (
    <>
      <div>
        <button
          data-ya-track="usemylocaton"
          className="ghost-button before-icon"
          title="Search using your current location!"
          id="useLocation"
          onClick={() => {
            data.onClick();
          }}
        >
          <UseMyLocationIcon />
          <span>{t("Use my location")}</span>
        </button>

        {data.modelopen && (
          <Modal
            onRequestClose={handleCloseModal}
            shouldCloseOnOverlayClick={true}
            isOpen={data?.modelopen}
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
            <div className="">
              <h2>{data.allowlocation}</h2>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
};
export default UsemylocationPopup;
