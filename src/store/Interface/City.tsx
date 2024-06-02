export type CityState = {
  city: any;
};

export type CityActionsMap = {
  SET_CITY_ADMIN: "SET_CITY_ADMIN";
  PUSH_CITY_ADMIN: "PUSH_CITY_ADMIN";
};

export type CityActions = {
  [Key in keyof CityActionsMap]: {
    type: Key;
    payload: any;
  };
}[keyof CityActionsMap];

export type CityDispatcher = <
  Type extends CityActions["type"],
  Payload extends any
>(
  type: Type,
  ...payload: Payload extends undefined ? [undefined?] : [Payload]
) => void;

export type CityContextInterface = {
  readonly state: CityState, 
  readonly dispatch: CityDispatcher
};
