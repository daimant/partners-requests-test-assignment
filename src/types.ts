export interface IPartner {
  id: number;
  name: string;
  city: string;
  status: string;
  createdAt: string;
  phone: string;
  comment: string;
}

export interface IFilters {
  name: string;
  city: string;
  status: string;
}

export interface IPartnersState {
  items: IPartner[] | null;
  isLoading: boolean;
  perPage: number;
  displayedItems: number;
  detailInfo: IPartner | null;
  filters: IFilters,
  sort: string | null,
}
