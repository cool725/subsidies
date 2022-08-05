const Storage = {
	set: (key: string, value: any) => localStorage.setItem(key, JSON.stringify(value)),
	get: (key: string) => localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) as string) : null,
	remove: (key: string) => localStorage.removeItem(key),
	clear: () => localStorage.clear(),
};

export default Storage;