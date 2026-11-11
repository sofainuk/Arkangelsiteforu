import { Icon } from "./Icon";

export function Marquee({ items }: { items: string[] }) {
  return (
    <div className="marquee" data-anim aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div className="marquee-group" key={copy}>
            {items.map((item) => (
              <span className="marquee-item" key={`${copy}-${item}`}>
                <Icon name="plus" size={16} strokeWidth={2.6} />
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
