import React from "react";

function Body({ rows, columns }) {
  return (
    <div>
      { rows?.length > 0 && rows?.map((row, index) => (
        <div className="flex items-center px-4 h-[84px] border-b-[1px]   border-[#D9D9D9] hover:bg-[#F5F5F5]" key={index}>
          {columns?.map((column, index) => {
            return (
                <div  key={index} className={`text-[#5C5C5C] text-[14px] font-[400] leading-[16.94px] mr-4  ${column?.className}`}>
                  <div className={`${ row[column?.fieldName]?.length > 100 ||
                      column.className > "w-[300px]"
                        ? "overflow-auto  h-[80px] flex flex-col  pt-2 pb-2 mr-3"
                        : "flex items-center"
                    } ${
                      !row[column?.fieldName]?.toString().includes(" ") &&
                      "justify-center"
                    }`}
                  >
                    {row[column?.fieldName]?.length > 100 ? (
                      <div className="">{row[column?.fieldName]}</div>
                    ) : (
                      <div className="flex flex-col justify-center h-full  self-center w-full">
                        {row[column?.fieldName]}
                      </div>
                    )}
                  </div>
                </div>
              )
          })}
        </div>
      ))}
    </div>
  );
}

export default Body;
