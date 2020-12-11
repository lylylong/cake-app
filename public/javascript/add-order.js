async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="order-title"]').value;
  const order_url = document.querySelector('input[name="order-url"]').value;

  const response = await fetch(`/api/orders`, {
    method: "POST",
    body: JSON.stringify({
      title,
      order_url,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".new-order-form")
  .addEventListener("submit", newFormHandler);
