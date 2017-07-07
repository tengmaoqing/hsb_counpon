import cheerio from 'cheerio';

let $body = null;
/* eslint-disable no-param-reassign */
const addRandomID = (data) => {
  if (!data.$compoentRandomID) {
    data.$compoentRandomID = +new Date();
  }
};

const addChildsProperty = (data) => {
  if (data.isClosingTag && !data.childs) {
    data.childs = [];
  }
};

const $ = (html) => {
  if (!$body) {
    $body = cheerio.load(html)('body');
  }

  $body.html(html);
  return $body.children();
};

const addID2HTML = (data) => {
  const $html = $(data.html);
  $html.attr('data-mq-id', data.$compoentRandomID);
  data.html = $html.parent().html();
};

const initContentItem = (data) => {
  addRandomID(data);
  addChildsProperty(data);
  addID2HTML(data);
};

const addHtmlPropser = (data, props) => {
  const $html = $(data.html);
  Object.keys(props).forEach((p) => {
    $html.attr(p, props[p]);
  });
  return $html.parent().html();
};

const updateStyle = (html, styles) => {
  const $html = $(html);
  Object.keys(styles).forEach((p) => {
    $html.css(p, styles[p]);
  });
  return $html.parent().html();
};

export default initContentItem;

export {
  initContentItem,
  addHtmlPropser,
  updateStyle,
};
