export const FriendRequestStatus = {
    ACCEPTED: 'ACCEPTED',
    REJECTED: 'REJECTED',
    PENDING: 'PENDING'
} as const

export type FriendRequestStatus = typeof FriendRequestStatus[keyof typeof FriendRequestStatus]