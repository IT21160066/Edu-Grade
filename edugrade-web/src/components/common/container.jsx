import React from "react";
import { cn } from "../../util/cn";

const Container = ({ children, className }) => {
  return (
    <div className={cn("max-w-screen-2xl w-full mx-auto px-4", className)}>
      {children}
    </div>
  );
};

export default Container;
