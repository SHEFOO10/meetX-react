

export const checkLoggedIn = async () => {
    try {
        const response = await fetch('https://api.shefoo.tech/profile', {
            method: 'GET',
            credentials: 'include', // Ensure cookies, including HttpOnly cookies, are sent
        });

        if (response.ok) {
            const data = await response.json();
            // Handle success (e.g., save token, redirect user)
            return { user: data };
        } else {
            // Handle errors (e.g., invalid credentials)
            console.error('Login failed:', response.statusText);
            return {}; // Return an empty object or appropriate error handling
        }
    } catch (error) {
        console.error('Error:', error);
        return {}; // Return an empty object or appropriate error handling
    }
};
