import Image from "next/image";
import type { EvidenceItem } from "@/content/portfolio";

type EvidenceFrameProps = {
  item: EvidenceItem;
};

export function EvidenceFrame({ item }: EvidenceFrameProps) {
  if (item.state === "needed") {
    return (
      <aside className="evidence-needed">
        <span>Evidence to add</span>
        <h3>{item.title}</h3>
        <p>{item.request}</p>
      </aside>
    );
  }

  return (
    <figure className="evidence-frame">
      <div className="evidence-frame__media">
        <Image
          alt={item.alt!}
          fill
          sizes="(max-width: 48rem) 100vw, 50vw"
          src={item.src!}
        />
      </div>
      <figcaption>{item.title}</figcaption>
    </figure>
  );
}
