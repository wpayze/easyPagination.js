const simpleJsPagination = (items, rows_per_page) => {
  let current_page = 1;
  const self = {
    paginate: ({ page = 1, handlePaginatedItems }) => {
      page--;

      let start = rows_per_page * page;
      let end = start + rows_per_page;
      let paginatedItems = items.slice(start, end);

      if (handlePaginatedItems != null) {
        handlePaginatedItems(paginatedItems);
      } else return paginatedItems;
    },
    createPaginationButtons: (
      wrapper,
      {
        onPaginationButtonClick,
        buttonsContainerClass = "pagination-buttons",
        buttonClass = "pagination-button",
        activeClass = "active",
      }
    ) => {
      if (onPaginationButtonClick == null) {
        return "An OnClick Handler is needed as second parameter.";
      }

	  const uuid = self.generateUID();
	  let page_count = Math.ceil(items.length / rows_per_page);
      let paginationButtons = document.createElement("div");
	  paginationButtons.classList.add(
        "pagination-" + uuid,
        buttonsContainerClass
      );

      let paginationButton = (page) => {
        let button = document.createElement("button");
        button.setAttribute("type", "button");
        button.classList.add(
          buttonClass
        );

		if (current_page == page)
			button.classList.add(activeClass);

        button.innerHTML = page;

        button.addEventListener("click", function () {
          current_page = page;

          onPaginationButtonClick(items, page);

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

// let current_page = 1;
// let rows = 5;

// const list_element = document.getElementById('list');
// const pagination_element = document.getElementById('pagination');

// function SetupPagination (items, wrapper, rows_per_page) {
// 	wrapper.innerHTML = "";

// 	let page_count = Math.ceil(items.length / rows_per_page);
// 	for (let i = 1; i < page_count + 1; i++) {
// 		let btn = PaginationButton(i, items);
// 		wrapper.appendChild(btn);
// 	}
// }

// function PaginationButton (page, items) {
// 	let button = document.createElement('button');
// 	button.innerText = page;

// 	if (current_page == page) button.classList.add('active');

// 	button.addEventListener('click', function () {
// 		current_page = page;
// 		DisplayList(items, list_element, rows, current_page);

// 		let current_btn = document.querySelector('.pagenumbers button.active');
// 		current_btn.classList.remove('active');

// 		button.classList.add('active');
// 	});

// 	return button;
// }

// DisplayList(list_items, list_element, rows, current_page);
// SetupPagination(list_items, pagination_element, rows);
