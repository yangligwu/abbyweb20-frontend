// src/components/doors/filters/types.ts
export type Availability = "Now" | "6-8 weeks";
export type Style = "Modern" | "Transitional" | "Traditional";
export type DoorType =
  | "Double door"
  | "Single door"
  | "Doors with Sidelight"
  | "Doors with transom"
  | "Wine doors"
  | "Windows";

export type Glass = "Tempered" | "Impact";
export type Shape = "Flat" | "Arch" | "Round";

export type DoorProduct = {
  id: string;
  name: string;
  image: string;
  availability: Availability;
  style: Style;
  doorType: DoorType;
  widthIn: number;
  heightIn: number;
  glass: Glass;
  shape: Shape;
  thermal: boolean;
  onSale: boolean;
};

export type Filters = {
  availability: Availability[];
  styles: Style[];
  doorTypes: DoorType[];
  glass: Glass[];
  shapes: Shape[];
  thermal: ("Yes" | "No")[];
  onSale: ("Yes" | "No")[];
  widthRange: [number, number];
  heightRange: [number, number];
};
