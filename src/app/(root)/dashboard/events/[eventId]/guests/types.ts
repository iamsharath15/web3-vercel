export interface UserProfile {
  id: string;
  name: string;
  email: string;
  profileImg: string | null;
}

export interface EventUser {
  userProfile: UserProfile;
  role: string;
  registrationStatus: string;
  paymentStatus: string | null;
}

export interface EventUsers {
  OWNER: EventUser[];
  MEMBER: EventUser[];
}

export interface InvitedUser {
  email: string;
  role: string;
  status: string;
}