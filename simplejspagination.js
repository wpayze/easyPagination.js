const simpleJsPagination = ({ items, rows, handlePaginatedItems }) => {
  let current_page = 1;
  const self = {
    paginate: (page = 1) => {
      page--;

      let start = rows * page;
      let end = start + rows;
      let paginatedItems = items.slice(start, end);

      if (handlePaginatedItems != null) {
        handlePaginatedItems(paginatedItems);
      } else return paginatedItems;
    },
    createPaginationButtons: ({
      wrapper,
      buttonsContainerClass = "pagination-buttons",
      buttonClass = "pagination-button",
      activeClass = "active",
    }) => {
      const uuid = self.generateUID();
      let page_count = Math.ceil(items.length / rows);
      let paginationButtons = document.createElement("div");
      paginationButtons.classList.add(
        "pagination-" + uuid,
        buttonsContainerClass
      );

      let paginationButton = (page) => {
        let button = document.createElement("button");
        button.setAttribute("type", "button");
        button.classList.add(buttonClass);

        if (current_page == page) button.classList.add(activeClass);

        button.innerHTML = page;

        button.addEventListener("click", function () {
          current_page = page;

          self.paginate(current_page);

          let current_btn = document.querySelector(
            `.${"pagination-" + uuid} button.active`
          );
          current_btn.classList.remove("active");

          button.classList.add("active");
        });

        return button;
      };

      for (let i = 1; i < page_count + 1; i++) {
        let btn = paginationButton(i);
        paginationButtons.appendChild(btn);
      }

      wrapper.appendChild(paginationButtons);
    },
    generateUID: () => {
      var firstPart = (Math.random() * 46656) | 0;
      var secondPart = (Math.random() * 46656) | 0;
      firstPart = ("000" + firstPart.toString(36)).slice(-3);
      secondPart = ("000" + secondPart.toString(36)).slice(-3);
      return firstPart + secondPart;
    },
  };

  return self;
};