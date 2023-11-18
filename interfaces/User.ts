export interface User {
  _id?: {
    $oid: string;
  };
  user_id: string;
  name: string;
  username: string;
  password: string;
  favourite_tea: string;
  brewing_time: number;
  brewed_teas: BrewedTea[];
  teas_drunken: number;
  badges: Badge[];
  reviews: Review[];
  average_rating: number;
  joined_at: number;
}

export interface BrewedTea {
  name: string;
  score: number;
}

export interface Badge {
  name: string;
  unlocked: boolean;
}

export interface Review {
  name: string;
  score: number;
}
