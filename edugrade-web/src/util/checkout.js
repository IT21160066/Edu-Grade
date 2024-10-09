const checkout = async ({ products }) => {
  try {
    const response = await fetch(
      "http://localhost:8000/api/payment-service/checkout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: products }),
      }
    );

    if (response.ok) {
      const responseData = await response.json();
      if (responseData.url) {
        localStorage.setItem(
          "sessionId",
          JSON.stringify(responseData.sessionId)
        );
        window.location.assign(responseData.url);
      }
    } else {
      throw new Error("Failed to checkout");
    }
  } catch (error) {
    console.error(error);
  }
};

export { checkout };
