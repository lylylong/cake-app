async function editFormHandler(event) {
  event.preventDefault();

  const orderFlavour = document.querySelector('select[name="flavour"]').value;
  const orderCategory = document.querySelector('select[name="category"]').value;
  // const title = document.querySelector('input[name="post-title"]').value.trim();
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

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  const response = await fetch(`/api/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      pickup_date,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard/");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".edit-post-form")
  .addEventListener("submit", editFormHandler);

$("#pickup-date").datepicker({
  minDate: 0,
});
