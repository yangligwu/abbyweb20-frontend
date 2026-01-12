// src/components/ui/Chevron.tsx
export const Chevron = ({
  open,
  size = 8,
  stroke = 2,
}: {
  open: boolean;
  size?: number;
  stroke?: number;
}) => (
  <span
    className="inline-block transition-transform duration-200"
    style={{
      width: size,
      height: size,
      borderRight: `${stroke}px solid currentColor`,
      borderBottom: `${stroke}px solid currentColor`,
      transform: open ? "rotate(-135deg)" : "rotate(45deg)",
    }}
  />
);
