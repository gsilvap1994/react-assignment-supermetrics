
export class StorageLayer {
    static set({ key, value }) {
        if (key && value) {
            localStorage.setItem(key, value)
        }
    }

    static get({ key }) {
        return localStorage.getItem(key);
    }

    static clear() {
        localStorage.clear();
    }
}
export default StorageLayer;
