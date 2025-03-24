export interface GameAttributes {
  id: number;
  publisherId: string;
  name: string;
  platform: 'ios' | 'android';
  storeId: string;
  bundleId: string;
  appVersion: string;
  isPublished: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface GameCreateAttributes extends Omit<GameAttributes, 'id'> {}
