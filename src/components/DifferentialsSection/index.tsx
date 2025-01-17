import DifferentialInfoCard from "@/components/DifferentialInfoCard";
import SectionContainer from "@/components/SectionContainer";
import SectionTitle from "@/components/SectionTitle";
import { IsMobileContext } from "@/contexts/isMobile";
import { diferenciais } from "@/mock/info";
import { useContext } from "react";

function DifferentialsSection() {
  const { isMobile } = useContext(IsMobileContext);
  const evenCards = diferenciais.filter(
    (diferencial) => diferencial.id % 2 === 0
  );
  const oddCards = diferenciais.filter(
    (diferencial) => diferencial.id % 2 !== 0
  );

  return (
    <SectionContainer isBlueBackground id={"diferenciais"}>
      <SectionTitle title="Nossos Diferenciais" />
      {isMobile ? (
        <div className="mt-12 grid w-full grid-flow-row-dense grid-cols-1 gap-10 lg:grid-cols-2">
          {diferenciais.map((diferencial) => (
            <DifferentialInfoCard key={diferencial.id} {...diferencial} />
          ))}
        </div>
      ) : (
        <div className="mt-12 flex w-full flex-row gap-10">
          <div className="flex-1 space-y-10">
            {oddCards.map((diferencial) => (
              <DifferentialInfoCard key={diferencial.id} {...diferencial} />
            ))}
          </div>
          <div className="mt-24 flex-1 space-y-10">
            {evenCards.map((diferencial) => (
              <DifferentialInfoCard key={diferencial.id} {...diferencial} />
            ))}
          </div>
        </div>
      )}
    </SectionContainer>
  );
}

export default DifferentialsSection;
