import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      <Reveal>
        <p className="font-mono text-eyebrow uppercase text-muted">// {eyebrow}</p>
      </Reveal>
      <SplitText as="h2" id={id} text={title} inView className="mt-5 font-display text-h1 text-balance" />
      {description ? (
        <Reveal delay={0.15}>
          <p className="mt-6 max-w-xl text-lead text-muted">{description}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
