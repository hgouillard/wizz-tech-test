export interface GameAttributes {
  id?: number;
  publisherId: string;
  name: string;
  platform: string;
  storeId: string;
  bundleId: string;
  appVersion: string;
  isPublished: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface GameCreationAttributes extends Omit<GameAttributes, 'id'> {}
