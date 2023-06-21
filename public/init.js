/* eslint-disable import/no-named-as-default */
// eslint-disable-next-line import/no-named-as-default-member
import DuplicateIcon from '@scaleflex/icons/duplicate';
import FilerobotImageEditor from '../packages/filerobot-image-editor/src';
import config from './demo-config';

function getElementById(id) {
  return document.getElementById(id);
}

const addImg = getElementById('add-image');
const content = getElementById('content');
const dropIndicator = getElementById('drop-indicator');

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
  console.log(imageInfo);
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

const base64toBlob = (base64url) => fetch(base64url).then((res) => res.blob());

function onSaveToClipboard(imageInfo) {
  // create blob from base64 string
  const blob = base64toBlob(imageInfo.imageBase64, imageInfo.mimeType);
  // eslint-disable-next-line prettier/prettier
  navigator.clipboard.write([
      new ClipboardItem({
        [imageInfo.mimeType]: blob,
      }),
    ])
    .then(() => {
      console.log('Copied to clipboard successfully!');
    })
    .catch((error) => {
      console.log('Unable to write to clipboard. :-(', error);
    });
}

const filerobotImageEditor = new FilerobotImageEditor(
  document.querySelector('#editor_container'),
  pluginConfig,
);

filerobotImageEditor.render({
  onSave,
  moreSaveOptions: [
    {
      label: 'Save with Options',
      icon: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.6358 1.52611L10.6367 1.52669C12.0996 2.48423 13.0845 3.97393 13.4308 5.67868C13.7768 7.38223 13.4302 9.13505 12.3952 10.5416L12.39 10.5495C11.4327 12.0121 9.94346 12.9968 8.23923 13.3433C7.8098 13.4238 7.35685 13.4767 6.93362 13.4767C3.87462 13.4767 1.16037 11.323 0.519402 8.23739L0.439941 7.68114V7.66612C0.439941 7.51027 0.483542 7.38547 0.56594 7.28247C0.641164 7.18844 0.75786 7.12545 0.882464 7.10167C1.03156 7.10432 1.15179 7.14773 1.25156 7.22754C1.34816 7.30483 1.41201 7.4259 1.43422 7.55435C1.60415 8.96178 2.28062 10.2289 3.35006 11.1576L3.35104 11.1584C5.69121 13.1603 9.21628 12.8792 11.1914 10.5379C13.1928 8.19761 12.9116 4.67271 10.5702 2.6978C9.44164 1.73866 8.00291 1.28774 6.53782 1.40044L6.53642 1.40056C5.21046 1.51341 3.97038 2.10561 3.04061 3.03539L2.70462 3.37138L3.76055 3.27979L3.7724 3.27705C4.02521 3.21871 4.29448 3.3949 4.35713 3.66641C4.41517 3.91791 4.24109 4.1857 3.97196 4.25015L1.82243 4.62652C1.69199 4.6481 1.55534 4.62267 1.46788 4.5527L1.45879 4.54543L1.4488 4.53944C1.35779 4.48483 1.27678 4.36595 1.25738 4.24958L0.819079 2.08516L0.818029 2.08061C0.759688 1.8278 0.935874 1.55854 1.20739 1.49588C1.45905 1.43781 1.72702 1.61214 1.79125 1.88157L1.96243 2.82299L2.19817 2.56396C4.3538 0.195428 7.94737 -0.257315 10.6358 1.52611Z" fill="#5D6D7E"/><path d="M7.49822 3.76409V7.16923L9.24296 8.91397C9.32292 8.99394 9.38351 9.11495 9.38351 9.25603C9.38351 9.37909 9.3437 9.49734 9.24296 9.59809C9.16576 9.67528 9.0184 9.73864 8.9009 9.73864C8.77784 9.73864 8.65958 9.69883 8.55884 9.59809L6.67355 7.7128C6.59636 7.6356 6.533 7.48823 6.533 7.37074V3.76409C6.533 3.50452 6.75603 3.28148 7.0156 3.28148C7.3025 3.28148 7.49822 3.4772 7.49822 3.76409Z" fill="#5D6D7E"/></svg>',
      onClick: (openSaveModal) => openSaveModal(onSave),
    },
    {
      label: 'Save To Clipboard',
      icon: DuplicateIcon,
      onClick: (_openSaveModal, saveDirectly) => saveDirectly(onSaveToClipboard),
    },
  ],
  useCloudimage: false,
  Resize: {
    maxWidth: 200,
    maxHeight: 200,
  },
});

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

addImg.addEventListener('change', uploadImg);

// handle dropping of images onto content
content.addEventListener('dragover', (e) => {
  e.preventDefault();
  e.stopPropagation();
  // show overlay telling user to drop the file
  dropIndicator.classList.remove('hidden');
});

// remove dropIndicator on dragleave
content.addEventListener('dragleave', (e) => {
  e.preventDefault();
  dropIndicator.classList.add('hidden');
});

// add file to imageInput on drop
content.addEventListener('drop', (e) => {
  uploadImg({ target: { files: e.dataTransfer.files } });
  e.preventDefault();
  dropIndicator.classList.add('hidden');
});
