export const sendOrder = async (date: string) => {
  try {
    const response = await fetch("https://example.com/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ date }),
    });

    if (!response.ok) {
      throw new Error(`Błąd serwera: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Błąd zamówienia:", error);
    throw error;
  }
};
