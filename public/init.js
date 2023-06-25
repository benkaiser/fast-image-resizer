/* eslint-disable import/no-named-as-default */
// eslint-disable-next-line import/no-named-as-default-member
import DuplicateIcon from '@scaleflex/icons/duplicate';
import SettingsIcon from '@scaleflex/icons/settings';
import DownloadIcon from '@scaleflex/icons/download';
import FilerobotImageEditor from '../packages/filerobot-image-editor/src';
import config from './demo-config';

function getElementById(id) {
  return document.getElementById(id);
}

const addImg = getElementById('add-image');
const content = getElementById('content');
const dropIndicator = getElementById('drop-indicator');
const sizeInput = document.getElementById('size');
const customWidth = document.getElementById('customWidth');
const customHeight = document.getElementById('customHeight');
const customSizeWrapper = document.querySelector('.customSizeWrapper');
const autoDownloadInput = document.getElementById('autoDownload');

const { TABS } = FilerobotImageEditor;

const DEFAULT_IMAGES_SRCS = [
  'https://scaleflex.cloudimg.io/v7/demo/river.png',
  'https://scaleflex.cloudimg.io/v7/demo/spencer-davis-unsplash.jpg',
  'https://scaleflex.cloudimg.io/v7/demo/damian-markutt-unsplash.jpg',
];
const DEFAULT_RESIZES = [
  { width: Infinity, height: Infinity, name: 'none', displayName: 'Original' },
  { width: 3840, height: 2160, name: '4k', displayName: '4K' },
  { width: 1920, height: 1080, name: '1080p', displayName: 'Full HD' },
  { width: 1280, height: 720, name: '720p', displayName: 'HD' },
  { width: 640, height: 480, name: '480p', displayName: 'SD' },
  { width: 320, height: 240, name: '240p' },
  {
    width: 1080,
    height: 1920,
    name: 'instagram-stories',
    displayName: 'Instagram Stories',
  },
  {
    width: 512,
    height: 512,
    name: 'instagram-small',
    displayName: 'Instagram Small',
  },
  {
    width: 1024,
    height: 1024,
    name: 'instagram-large',
    displayName: 'Instagram Large',
  },
  { width: 1200, height: 630, name: 'og-meta', displayName: 'OG Meta Image' },
  { width: 0, height: 0, name: 'custom', displayName: 'Custom' },
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
      // eslint-disable-next-line no-undef
      Toastify({
        text: 'Image copied to clipboard',
        duration: 5000,
      }).showToast();
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error(error);
      // eslint-disable-next-line no-undef
      Toastify({
        text: 'Failed to copy image, see consle for error',
        duration: 5000,
      }).showToast();
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
      id: 'dialog',
      icon: SettingsIcon,
      onClick: (openSaveModal) => openSaveModal(onSave),
    },
    {
      label: 'Download (JPG)',
      id: 'downloadJpg',
      icon: DownloadIcon,
      onClick: (_openSaveModal, saveDirectly) => saveDirectly(onSave, 'jpg'),
    },
    {
      label: 'Download (PNG)',
      id: 'downloadPng',
      icon: DownloadIcon,
      onClick: (_openSaveModal, saveDirectly) => saveDirectly(onSave, 'png'),
    },
    {
      label: 'Download (WEBP)',
      id: 'downloadWebp',
      icon: DownloadIcon,
      onClick: (_openSaveModal, saveDirectly) => saveDirectly(onSave, 'webp'),
    },
    {
      label: 'Save To Clipboard (PNG)',
      id: 'copyPng',
      icon: DuplicateIcon,
      onClick: (_openSaveModal, saveDirectly) =>
        saveDirectly(onSaveToClipboard, 'png'),
    },
  ],
  avoidChangesNotSavedAlertOnLeave: true,
  useCloudimage: false,
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

  filerobotImageEditor.render({
    source: imageUrl,
    defaultSavedImageName: imageContainer.dataset.name,
  });
}

function appendImageToContainer(imageSrc, name) {
  let filename = name;
  if (!filename) {
    filename = imageSrc.split('/').pop();
  }
  const imagesWrapper = document.querySelector('.uploaded-imgs-wrapper');
  const imageWrapper = document.createElement('div');

  imageWrapper.style.backgroundImage = `url(${imageSrc})`;

  imageWrapper.className = 'uploaded-img';
  imageWrapper.dataset.name = filename;

  imageWrapper.onclick = () => toggleActiveImage(imageWrapper, imageSrc);

  imagesWrapper.appendChild(imageWrapper);
  imagesWrapper.scrollTop = imagesWrapper.scrollHeight;

  return imageWrapper;
}

function uploadImg(event) {
  const imageSrc = URL.createObjectURL(event.target.files[0]);

  const imageContainer = appendImageToContainer(
    imageSrc,
    event.target.files[0].name,
  );

  toggleActiveImage(imageContainer, imageSrc);

  filerobotImageEditor.render({ source: imageSrc });
}

function changeSize(event) {
  const selectedSize = DEFAULT_RESIZES.find((resize) => {
    return resize.name === event.target.value;
  }) || { width: 0, height: 0, name: 'none' };
  let newResizeObject = {
    maxWidth: selectedSize.width,
    maxHeight: selectedSize.height,
  };
  if (selectedSize.name === 'custom') {
    newResizeObject = {
      maxWidth: customWidth.value,
      maxHeight: customHeight.value,
    };
    customSizeWrapper.classList.remove('hidden');
  } else if (customSizeWrapper.classList.contains('hidden') === false) {
    customSizeWrapper.classList.add('hidden');
  }
  filerobotImageEditor.render({
    Resize: newResizeObject,
  });
}

let customSizeChangeTimeout;
function onCustomSizeChangeDebounce() {
  if (customSizeChangeTimeout) {
    clearTimeout(customSizeChangeTimeout);
  }
  customSizeChangeTimeout = setTimeout(() => {
    changeSize({ target: { value: 'custom' } });
  }, 500);
}

customWidth.addEventListener('keyup', onCustomSizeChangeDebounce);

customHeight.addEventListener('keyup', onCustomSizeChangeDebounce);

document.onreadystatechange = () => {
  DEFAULT_IMAGES_SRCS.forEach((imageSrc, index) => {
    const imageContainer = appendImageToContainer(imageSrc);

    if (!index) {
      toggleActiveImage(imageContainer, imageSrc);
    }
  });
  DEFAULT_RESIZES.forEach((resize) => {
    const option = document.createElement('option');
    option.value = resize.name;
    option.innerHTML = `${resize.width}x${resize.height}`;
    if (resize.displayName) {
      option.innerHTML += ` - ${resize.displayName}`;
    }
    if (resize.name === 'none') {
      option.selected = true;
      option.innerHTML = resize.displayName;
    }
    if (resize.name === 'custom') {
      option.innerHTML = resize.displayName;
    }
    sizeInput.appendChild(option);
    sizeInput.onchange = changeSize;
  });
};

autoDownloadInput.onchange = (event) => {
  if (event.target.value === 'false') {
    filerobotImageEditor.render({
      autoDownload: null,
    });
    return;
  }
  filerobotImageEditor.render({
    autoDownload: event.target.value,
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
