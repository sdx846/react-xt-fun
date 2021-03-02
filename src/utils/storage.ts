/*
 * @Description: 封装浏览器缓存，生产环境进行加密处理
 */

type StorageType = "session" | "local";

class Storage {
    storage: globalThis.Storage;
    isProduction: boolean;
    constructor(public type: StorageType = "session") {
        this.storage = type === "session" ? window.sessionStorage : window.localStorage;
        this.isProduction = process.env.REACT_APP_ENV === "production" ? true : false;
    }

    validateValue(value: any) {
        return !(value === null || value === undefined || value === "");
    }

    getItem(key: string) {
        let value: any;
        let tmp: string | null = this.storage.getItem(key);
        if (this.validateValue(tmp)) {
            if (this.isProduction) {
                value = JSON.parse(this.dec(tmp));
            } else {
                value = JSON.parse(tmp as string);
            }
        }
        return value || false;
    }

    setItem(key: string, value: any) {
        if (this.validateValue(value)) {
            if (this.isProduction) {
                value = this.enc(JSON.stringify(value));
            } else {
                value = JSON.stringify(value);
            }
            this.storage.setItem(key, value);
        }
    }

    removeItem(key: string) {
        this.storage.removeItem(key);
    }

    clear() {
        this.storage.clear();
    }

    enc(value: any) {
        return escape(value);
    }

    dec(value: any) {
        return unescape(value);
    }
}
export const localStore = new Storage('local');
export const sessionStore = new Storage('session');
