export const getDashboardItemTitle = (
    disabled: boolean = false,
    dashboardName: string,
) => {
    return disabled
        ? `Пост уже добавлен в доску "${dashboardName}"`
        : `Доска "${dashboardName}"`
}
