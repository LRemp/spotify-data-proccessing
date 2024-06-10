export interface IQualifier<Type> {
  qualifies: (data: Type) => boolean;
}
