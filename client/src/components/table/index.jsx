import React from "react";
import Header from "./header";
import Body from "./body";


 {/* h-[430px] max-h-[500px] */}
function Table({ rows, columns }) {
   return (
        <div className="overflow-x-auto scrollbar-hide ">
          <div className="min-w-fit relative">
            <Header columns={columns} />
            <div className="overflow-y-scroll overflow-hidden dark-scrollbar !mb-5 ">
              <Body rows={rows} columns={columns} />
            </div>
          </div>
        </div>
    );
}

export default Table;