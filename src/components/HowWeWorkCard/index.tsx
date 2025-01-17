import { IsMobileContext } from "@/contexts/isMobile";
import { HowWeWork } from "@/interfaces/HowWeWork";
import { useContext } from "react";

function HowWeWordCard({ id, title, description }: HowWeWork) {
  const { isMobile } = useContext(IsMobileContext);

  if (isMobile) {
    return (
      <div className="flex flex-col">
        <div className="flex flex-1 items-start justify-center">
          <h1 className="text-7xl font-bold leading-relaxed text-primary-blue-500">
            {id}.
          </h1>
        </div>
        <div className="flex flex-col space-y-2">
          <h1 className="text-center text-[24px] font-bold leading-relaxed lg:text-2xl">
            {title}
          </h1>
          <p className="text-justify text-base font-normal leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-row justify-between space-x-10">
        <div className="flex flex-1 items-start justify-center">
          <h1 className="text-7xl font-bold leading-relaxed text-primary-blue-500">
            {id}.
          </h1>
        </div>
        <div className="flex-3 flex flex-col">
          <h1 className="text-[22px] font-bold leading-relaxed lg:text-2xl">
            {title}
          </h1>
          <p className="text-base font-normal leading-relaxed">{description}</p>
        </div>
      </div>
    );
  }
}

export default HowWeWordCard;
