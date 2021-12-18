import { Document } from "mongoose";

export default interface Utility extends Document {
  name: string;
  category: string; // TODO this should be an enum
  phone: string;
  website: string;
  onSite: boolean;
  isConfirmed: boolean;
  hours: {
    monday: {
      start: number;
      end: number;
    },
    tuesday: {
      start: number;
      end: number;
    },
    wednesday: {
      start: number;
      end: number;
    },
    thursday: {
      start: number;
      end: number;
    },
    friday: {
      start: number;
      end: number;
    },
    saturday: {
      start: number;
      end: number;
    },
    sunday: {
      start: number;
      end: number;
    }
  };
  address: {
    line1: string;
    line2: string;
    city: string;
    country: string; // TODO add country code validation
    zipCode: string;
  };
  description: string;
  notes: string;
  // createdOn: { type: Date, default: Date.now }; TODO add this later
};
