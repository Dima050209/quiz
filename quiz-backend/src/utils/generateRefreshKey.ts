export const generateRefreshKey = (userId: number, refreshToken: string) => {
    return `refresh:${userId}:${refreshToken}`;
}