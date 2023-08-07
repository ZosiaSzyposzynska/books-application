const select = {
  templateOf: {
    templateBook: '#template-book',
  },
};

/* Templates */
const templates = {
  templateBook: Handlebars.compile(document.querySelector(select.templateOf.templateBook).innerHTML),
};

export {templates};

