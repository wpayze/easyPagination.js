# Easy Pagination JS

<<<<<<< HEAD

# A simple library for pagination, compatible with Bootstrap.

A simple library for pagination, **compatible with Bootstrap**.

> > > > > > > b6b788ff1ede6f7a4038a907e216d50bc626c2e2

Check my website [here](https://wilfredopaiz.com/).

## Demo

Check this Demo [here](https://wpayze.github.io/easyPagination/).
![Demo](./images/demo.png)

## Example

Import the file

```html
<script src="./easyPagination.js"></script>
```

Add a div for the items, and one for the pagination buttons.

```html
<div id="list"></div>
<div id="pagination"></div>
```

Create some example items.

```js
const items = [
  "item 1",
  "item 2",
  "item 3",
  "item 4",
  "item 5",
  "item 6",
  "item 7",
  "item 8",
  "item 9",
  "item 10",
];
```

Create the pagination object and execute `paginate()`

```js
const paginationOptions = {
  items,
  rows: 5,
  buttonsWrapper: "#pagination",
  handlePaginatedItems: (items) => {
    const list = document.getElementById("list");
    list.innerHTML = "";
    items.forEach((item) => {
      list.innerHTML += `<div>${item}</div>`;
    });
  },
};

easyPagination(paginationOptions).paginate();
```

## Available Options

| Syntax                | Description                                                                                                  | Default Value |
| --------------------- | ------------------------------------------------------------------------------------------------------------ | ------------- |
| items                 | Items to paginate. (Array)                                                                                   |
| rows                  | Rows per page.                                                                                               | 10            |
| buttonsWrapper        | CSS Selector where the buttons where be injected.                                                            |
| handlePaginatedItems  | Function that receives the paginated items as parameter, if this is null `paginate()` will return the items. |
| buttonsContainerClass | CSS Class for the buttons container.                                                                         | "pagination"  |
| buttonClass           | CSS Class for each button.                                                                                   | "page-link"   |
| nextClass             | CSS Class for the "Next" button.                                                                             | "page-link"   |
| prevClass             | CSS Class for the "Prev" button.                                                                             | "page-link"   |
| nextText              | Text for the "Next" button.                                                                                  | "next >"      |
| prevText              | Text for the "Prev" button.                                                                                  | "< prev"      |
| activeClass           | CSS Class for the current pagination button.                                                                 | "active"      |

Note: you can import Bootstrap CDN in order to show a nice pagination.
