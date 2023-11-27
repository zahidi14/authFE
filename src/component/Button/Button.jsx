import React from "react";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";

const Button = ({ loading, name, ...rest }) => {
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
  return (
    <button
      {...rest}
      className="w-full h-50 rounded-md border-4 bg-teal-500 border-teal-500 text-white hover:border-4  hover:border-teal-600 hover:bg-white hover:text-teal-500"
    >
      {loading ? (
        <ClipLoader
          css={override}
          size={15}
          color={"#123abc"}
          loading={loading}
        />
      ) : (
        name
      )}
    </button>
  );
};

export default Button;
