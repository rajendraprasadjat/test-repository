import React from "react";

interface InfowindowProps {
  data: any;
}

function Infowindow({ data }: InfowindowProps) {
  return <div>{data}</div>;
}

export default Infowindow;
