export interface IItem {
  id: string;
  description: string;
  info: {
    name: string;
    age: number;
    created: string;
  };
}

export interface IGridParams {
  onLinkClick(event: React.MouseEvent): void;
}