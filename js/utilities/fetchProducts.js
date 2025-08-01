export default async function fetchProducts() {
    try {
        const resp = await fetch('./data/data.json');
        if (!resp.ok) {
            throw new Error(`HTTP error! Status: ${resp.status}`);
        }
        const data = await resp.json();
        return data;
    } catch (error) {
        console.error('Error occured', error);
        return [];
    }
}