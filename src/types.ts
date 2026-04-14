export interface IPartner {
  id: number;
  name: string;
  city: string;
  status: string;
  createdAt: string;
  phone: string;
  comment: string;
}

export interface IPartnersState {
  items: IPartner[] | null;
  isLoading: boolean;
  perPage: number;
  displayedItems: number;
  detailInfo: IPartner | null;
}

export interface IState {
  partners: IPartnersState;
}
