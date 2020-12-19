async function newFormHandler(event) {
  event.preventDefault();

  const orderFlavour = document.querySelector('select[name="flavour"]').value;
  const orderCategory = document.querySelector('select[name="category"]').value;
  // const title = document.querySelector('input[name="post-title"]').value;
  const title = orderFlavour + " " + orderCategory;
  $("#modalDueDate").datepicker();
  const pickup_date = document.querySelector('input[name="pickup-date"]').value;

  if (
    orderFlavour === "Flavour Menu" ||
    orderCategory === "Category Menu" ||
    pickup_date === ""
  ) {
    alert("Please double check your order details!");
    return;
  }

  const response = await fetch(`/api/posts`, {
    method: "POST",
    body: JSON.stringify({
      title,
      pickup_date,
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
  .querySelector(".new-post-form")
  .addEventListener("submit", newFormHandler);

$("#pickup-date").datepicker({
  minDate: 0,
});
