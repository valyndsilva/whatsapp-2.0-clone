interface FriendData {
  displayName: string;
  email: string;
  lastSeen: {
    toDate(): moment.MomentInput;
    seconds: number;
    nanoseconds: number;
  };
  photoURL: string;
}

interface ChatsData {
  id: string;
  latestMessage: string;
  timestamp: {
    toDate(): moment.MomentInput;
    seconds: number;
    nanoseconds: number;
  };
  users: [string];
}
