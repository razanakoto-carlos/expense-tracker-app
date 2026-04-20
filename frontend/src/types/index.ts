export type Category = {
  id: number;
  name: string;
};

export type Expense = {
  id: number;
  title: string;
  amount: number;
  date: string;
  categoryId?: number;
};

export type CategoryStat = {
  category: string;
  total: number;
  count: number;
};

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends AuthCredentials {
  name: string;
}

export interface AuthFormProps<T> {
  title: string;
  onSubmit: (data: T) => void;
  withName?: boolean;
}
