// Vous pourriez avoir des fonctions pour gérer le stockage et la récupération des données
export async function storeData(key, value, options) {
    return await SHARINGAN.put(key, value, options);
}

export async function listData(options) {
    return await SHARINGAN.list(options);
}

export async function getData(key) {
    return await SHARINGAN.get(key);
}

export function generateRandomKey() {
    return Math.random().toString(36).substring(7);
}
