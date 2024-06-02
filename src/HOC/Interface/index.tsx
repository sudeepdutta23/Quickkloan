export interface RouteGuard {
    type: 'Admin' | 'User',
    children: JSX.Element,
}