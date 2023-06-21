/* eslint-disable import/no-named-as-default */
// eslint-disable-next-line import/no-named-as-default-member
import FilerobotImageEditor from '../packages/filerobot-image-editor/src';
import config from './demo-config';

function getElementById(id) {
  return document.getElementById(id);
}

const crop = getElementById('crop');
const finetune = getElementById('finetune');
const filter = getElementById('filter');
const watermark = getElementById('watermark');
const annotate = getElementById('annotate');
const resize = getElementById('resize');
const addImg = getElementById('add-image');
const accordions = document.querySelectorAll('[data-accordion]');

const { TABS } = FilerobotImageEditor;

const DEFAULT_IMAGES_SRCS = [
  'https://scaleflex.cloudimg.io/v7/demo/river.png?w=100',
  'https://scaleflex.cloudimg.io/v7/demo/spencer-davis-unsplash.jpg?w=100',
  'https://scaleflex.cloudimg.io/v7/demo/damian-markutt-unsplash.jpg?w=100',
];

const selectedTabs = [
  TABS.ADJUST,
  TABS.FINETUNE,
  TABS.FILTERS,
  TABS.WATERMARK,
  TABS.ANNOTATE,
  TABS.RESIZE,
];

const IMG_EDITOR_TABS = {
  adjust: TABS.ADJUST,
  finetune: TABS.FINETUNE,
  filter: TABS.FILTERS,
  watermark: TABS.WATERMARK,
  annotate: TABS.ANNOTATE,
  resize: TABS.RESIZE,
};

const pluginConfig = {
  ...config,
  source: 'https://scaleflex.cloudimg.io/v7/demo/river.png',
  tabsIds: selectedTabs,
  defaultTabId: TABS.RESIZE,
  defaultToolId: null,
  observePluginContainerSize: true,
  cloudimage: {
    token: 'demo',
    version: 'v7',
  },
};

function onSave(imageInfo) {
  const url = imageInfo.imageBase64;
  const { fullName: fileName } = imageInfo;

  let tmpLink = document.createElement('a');
  tmpLink.href = url;

  tmpLink.download = fileName;

  tmpLink.style = 'position: absolute; z-index: -111; visibility: none;';
  document.body.appendChild(tmpLink);
  tmpLink.click();
  document.body.removeChild(tmpLink);
  tmpLink = null;
}

const filerobotImageEditor = new FilerobotImageEditor(
  document.querySelector('#editor_container'),
  pluginConfig,
);

filerobotImageEditor.render({
  onSave,
  useCloudimage: false,
});

function onChangeTabsHandler(event) {
  const { target } = event;
  const { value, checked } = target;
  const nextTab = IMG_EDITOR_TABS[value];

  if (checked) {
    if (!selectedTabs.includes(nextTab)) {
      selectedTabs.push(nextTab);
    }
  } else {
    const removedTabIndex = selectedTabs.indexOf(nextTab);

    if (selectedTabs.includes(nextTab) && selectedTabs.length === 1) {
      target.checked = true;
      return;
    }

    selectedTabs.splice(removedTabIndex, 1);
  }

  filerobotImageEditor.render({ tabsIds: [...selectedTabs] });
}

function toggleActiveImage(imageContainer, imageSrc) {
  const removeResizeParamRegex = /\?.+/g;
  const imageUrl = imageSrc.replace(removeResizeParamRegex, '');
  const prevImageContainer = document.querySelector(
    '[data-image-editor-active-image]',
  );

  if (prevImageContainer) {
    prevImageContainer.removeAttribute('data-image-editor-active-image');
  }

  imageContainer.setAttribute('data-image-editor-active-image', '');

  filerobotImageEditor.render({ source: imageUrl });
}

function appendImageToContainer(imageSrc) {
  const imagesWrapper = document.querySelector('.uploaded-imgs-wrapper');
  const imageWrapper = document.createElement('div');

  imageWrapper.style.backgroundImage = `url(${imageSrc})`;

  imageWrapper.className = 'uploaded-img';

  imageWrapper.onclick = () => toggleActiveImage(imageWrapper, imageSrc);

  imagesWrapper.appendChild(imageWrapper);
  imagesWrapper.scrollTop = imagesWrapper.scrollHeight;

  return imageWrapper;
}

function uploadImg(event) {
  const imageSrc = URL.createObjectURL(event.target.files[0]);

  const imageContainer = appendImageToContainer(imageSrc);

  toggleActiveImage(imageContainer, imageSrc);

  filerobotImageEditor.render({ source: imageSrc });
}

document.onreadystatechange = () => {
  DEFAULT_IMAGES_SRCS.forEach((imageSrc, index) => {
    const imageContainer = appendImageToContainer(imageSrc);

    if (!index) {
      toggleActiveImage(imageContainer, imageSrc);
    }
  });
};

function showAccordionContent(event) {
  const contentId = event.target.getAttribute('data-accordion');
  const content = document.querySelector(
    `[data-accordion-content="${contentId}"]`,
  );

  content.style.display = !content?.offsetWidth ? 'block' : 'none';
}

crop.addEventListener('change', onChangeTabsHandler);
finetune.addEventListener('change', onChangeTabsHandler);
filter.addEventListener('change', onChangeTabsHandler);
watermark.addEventListener('change', onChangeTabsHandler);
annotate.addEventListener('change', onChangeTabsHandler);
resize.addEventListener('change', onChangeTabsHandler);
addImg.addEventListener('change', uploadImg);
accordions.forEach((accordion) => {
  accordion.addEventListener('click', showAccordionContent);
});
