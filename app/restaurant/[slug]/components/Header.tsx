import React from "react";

const Header = ({ name }: { name: string }) => {
  const renderTitle = () => {
    const nameArray = name.split("-");
    nameArray.pop();
    return nameArray.map((word) => {
      return word[0].toUpperCase() + word.slice(1) + " ";
    });
  };

  return (
    <div className="h-96 overflow-hidden">
      <div className="bg-center bg-gradient-to-r from-[#0f1f47] to-[#5f6984] h-full flex justify-center items-center">
        <h1 className="text-4xl md:text-7xl text-white captitalize text-shadow text-center">
          {renderTitle()}
        </h1>
      </div>
    </div>
  );
};

export default Header;
