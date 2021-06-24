import { writable } from 'svelte/store';

export const layout = writable(0);
export const files = writable([]);
export const pageTable = writable({});
export const page = writable({});
export const compConfig = writable([]);
