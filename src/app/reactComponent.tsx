import React, { FC } from "react";

export type ReactComponentProps = {
  value: string;
  onChange: React.Dispatch<string>;
}

export const ReactComponent: React.FC<ReactComponentProps> = ({ value, onChange }) => {
  return (
    <>
      <label>
        Input box controlled by React
        <input type="text" value={value} onChange={evt => onChange(evt.target.value)} className="react-input" />
      </label>

      <div className="react-value">
        value from react: {value}
      </div>
    </>
  );
}
