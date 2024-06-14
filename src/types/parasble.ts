export interface IParsable {
  parse: (data: string) => void;
  toString: () => string;
}
