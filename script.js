document.addEventListener("DOMContentLoaded", () => {
    const menuTableBody = document.querySelector("#menu-table tbody");
    const checkoutButton = document.getElementById("checkout-button");
    const orderSummary = document.getElementById("order-summary");
    const selectedProductsList = document.getElementById("selected-products");
    const totalPriceEl = document.getElementById("total-price");

    // Dados do cardápio diretamente no JavaScript
    const produtos = [
        { id: "1", descricao: "Pão na chapa", preco: "R$4,00" },
        { id: "2", descricao: "Pão de queijo", preco: "R$5,00" }
    ];

    // Carregar os produtos na tabela
    produtos.forEach(product => {
        const priceNumber = parseFloat(product.preco.replace("R$", "").replace(",", "."));
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.descricao}</td>
            <td>${product.preco}</td>
            <td><input type="number" min="0" value="0" data-price="${priceNumber}" data-id="${product.id}" data-description="${product.descricao}"></td>
        `;
        menuTableBody.appendChild(row);
    });

    // Fechar pedido
    checkoutButton.addEventListener("click", () => {
        const inputs = document.querySelectorAll("#menu-table tbody input");
        let total = 0;
        selectedProductsList.innerHTML = "";

        inputs.forEach(input => {
            const quantity = parseInt(input.value, 10);
            if (quantity > 0) {
                const price = parseFloat(input.dataset.price);
                const description = input.dataset.description;

                total += price * quantity;

                const listItem = document.createElement("li");
                listItem.textContent = `${quantity}x ${description} - R$ ${(price * quantity).toFixed(2).replace(".", ",")}`;
                selectedProductsList.appendChild(listItem);
            }
        });

        if (total > 0) {
            totalPriceEl.textContent = `Total: R$ ${total.toFixed(2).replace(".", ",")}`;
            orderSummary.style.display = "block";
        } else {
            alert("Selecione pelo menos um produto para fechar o pedido.");
        }
    });
});
