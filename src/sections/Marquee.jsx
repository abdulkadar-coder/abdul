import { ScrollVelocity } from "../reactbits/ScrollVelocity";
import { marqueeItems } from "../data/content";

export default function Marquee() {
  return (
    <div className="marquee-wrap" aria-hidden="true">
      <ScrollVelocity
        texts={[marqueeItems.join("  ·  ")]}
        velocity={52}
        numCopies={4}
        fontSize={12}
        fontWeight={400}
        color="var(--muted-2)"
        gap={28}
        parallaxClassName="marquee"
        scrollerClassName="marquee-track"
        className="marquee-text"
        pauseOnHover
        fadeEdges
        draggable
      />
    </div>
  );
}
