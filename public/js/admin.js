console.log("admin.js <-----");

const deleteProductHandler = (button) => {
  const product_id = button.name.split("_")[1];
  const productCard = document.getElementById(product_id);

  fetch(`/admin/delete-product/${product_id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      productCard.remove();
      console.log("The data =>", data);
    })
    .catch((error) => {
      console.log("The error =>", error);
    });
};
