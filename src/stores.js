import { writable } from 'svelte/store';

export const files = writable([]);
export const pageTable = writable({});
export const page = writable({});
export const compConfig = writable([]);
export const chooseComponent = writable(false);
