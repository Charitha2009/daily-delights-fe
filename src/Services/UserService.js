export const getUserDetails = async (token) => {
    const response = await fetch('/api/users/details', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch user details');
    }
    const data = await response.json();
    return data;
  };
  