export interface IPartner {
  id: number;
  name: string;
  city: string;
  status: string;
  createdAt: string;
}

export interface IPartnersState {
  items: IPartner[] | null;
  isLoading: boolean;
  perPage: number;
  displayedItems: number;
}

export interface IState {
  partners: IPartnersState;
}
