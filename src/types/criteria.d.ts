export interface ICriteria<Type> {
  qualifies: (data: Type) => boolean;
}
