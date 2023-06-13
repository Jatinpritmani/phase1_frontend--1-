import localStore from "./localstore.util";

export const getToken = () => localStore.get_data("token");

export const setToken = (token) => localStore.store_data("token", token);

export const deleteToken = () => localStore.remove_data("token");
