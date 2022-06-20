const easyPagination = ({
  items,
  rows,
  handlePaginatedItems,
  buttonsWrapper,
  buttonsContainerClass = "pagination",
  buttonClass = "page-link",
  nextClass = "page-link",
  prevClass = "page-link",
  nextText = "next >",
  prevText = "< prev",
  activeClass = "active",
}) => {
  if (!items) {
    console.error("items not defined. Send {items: ...} as a parameter.");
    return false;
  }

  const generateUID = () => {
    var firstPart = (Math.random() * 46656) | 0;
    var secondPart = (Math.random() * 46656) | 0;
    firstPart = ("000" + firstPart.toString(36)).slice(-3);
    secondPart = ("000" + secondPart.toString(36)).slice(-3);
    return firstPart + secondPart;
  };

  const createPaginationButtons = ({ wrapper }) => {
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

        self.paginate(current_page, false);

        let current_btn = getActiveBtn();
        current_btn.classList.remove("active");

        button.classList.add("active");
      });

      return button;
    };

    let prevNextBtns = () => {
      let prevBtn = document.createElement("button");
      prevBtn.setAttribute("type", "button");
      prevBtn.classList.add(prevClass);
      prevBtn.innerHTML = prevText;

      let nextBtn = document.createElement("button");
      nextBtn.setAttribute("type", "button");
      nextBtn.classList.add(nextClass);
      nextBtn.innerHTML = nextText;

      prevBtn.addEventListener("click", () => {
        self.prev();
      });

      nextBtn.addEventListener("click", () => {
        self.next();
      });

      return { prevBtn, nextBtn };
    };

    const { prevBtn, nextBtn } = prevNextBtns();

    paginationButtons.appendChild(prevBtn);

    for (let i = 1; i < page_count + 1; i++) {
      let btn = paginationButton(i);
      paginationButtons.appendChild(btn);
    }

    paginationButtons.appendChild(nextBtn);

    wrapper.appendChild(paginationButtons);
  };

  const getAllBtns = () => {
    return document.querySelectorAll(`.${"pagination-" + uuid} button`);
  };

  const getActiveBtn = () => {
    return document.querySelector(`.${"pagination-" + uuid} button.active`);
  };

  const uuid = generateUID();

  if (!rows) rows = 10;

  rows = parseInt(rows);

  let current_page = 1;

  const self = {
    paginate: (page = 1, loadButtons = true) => {
      page--;

      let start = rows * page;
      let end = start + rows;
      let paginatedItems = items.slice(start, end);

      if (loadButtons && buttonsWrapper)
        createPaginationButtons({
          wrapper: document.querySelector(buttonsWrapper),
        });

      if (handlePaginatedItems) {
        handlePaginatedItems(paginatedItems);
      } else return paginatedItems;
    },
    next: () => {
      let page = current_page - 1;
      page++;

      if (current_page + 1 > getAllBtns().length - 2) return;

      current_page++;
      let start = rows * page;
      let end = start + rows;
      let paginatedItems = items.slice(start, end);

      let current_btn = getActiveBtn();
      current_btn.classList.remove("active");
      current_btn.nextElementSibling.classList.add("active");

      if (handlePaginatedItems) {
        handlePaginatedItems(paginatedItems);
      } else return paginatedItems;
    },
    prev: () => {
      let page = current_page - 1;
      page--;

      if (current_page - 1 < 1) return;

      current_page--;

      let start = rows * page;
      let end = start + rows;
      let paginatedItems = items.slice(start, end);

      let current_btn = getActiveBtn();
      current_btn.classList.remove("active");
      current_btn.previousElementSibling.classList.add("active");

      if (handlePaginatedItems) {
        handlePaginatedItems(paginatedItems);
      } else return paginatedItems;
    },
    changeRows: (newRows = 10) => {
      rows = parseInt(newRows);
      document.querySelector(".pagination-" + uuid).remove();
      self.paginate(current_page);
    },
    changeItems: (newItems) => {
      if (!newItems) return false;

      items = newItems;
      document.querySelector(".pagination-" + uuid).remove();

      current_page = 1;
      self.paginate(1);
    },
  };

  return self;
};
