import React, { useEffect, useCallback } from "react";

const ShowResult = ({ val, removeMsg, list }) => {
  const show = useCallback(() => {
    const timeout = setTimeout(() => {
      removeMsg(false);
    }, 20000);
    return () => clearTimeout(timeout);
  }, [removeMsg]);

  useEffect(() => {
    show();
  }, [show]);

  return (
    <div className="predicted">
      {val ? (
        <p className="similar">Has similar intent</p>
      ) : (
        <p className="different">Has different intent</p>
      )}
    </div>
  );
};

export default ShowResult;
