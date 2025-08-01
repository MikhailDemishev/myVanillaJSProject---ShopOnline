export default async function postOnServer(formData) {
    const server = 'https://httpbin.org/post';
    const client = {
        name: formData.get('name'),
        email: formData.get('email'),
    };

    const response = await fetch(server, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(client)
    })

    if (!response.ok) {
        throw new Error(`Ошибка HTTP! Статус: ${response.status}`);
    }

    return response;

}