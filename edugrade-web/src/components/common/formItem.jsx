import React from "react";
import PropTypes from "prop-types";
import { cn } from "../../util/cn";

const FormItem = ({ children, name, errors, className }) => {
  return (
    <div className={cn(className)}>
      {children}
      {errors[name] && (
        <p className="text-xs text-red-600 mt-1 ml-1">{errors[name].message}</p>
      )}
    </div>
  );
};

export default FormItem;
