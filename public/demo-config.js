/* eslint-disable */
// THIS FILE IS NOT USED ANYWHERE, JUST FOR MENTIONING AN EXAMPLE OF CONFIG
import Social from '@scaleflex/icons/social';
import CropClassicTv from '@scaleflex/icons/crop-classic-tv';
import CropCinemaScope from '@scaleflex/icons/crop-cinema-scope';

import FilerobotImageEditor from 'filerobot-image-editor/src';
import toPrecisedFloat from 'react-filerobot-image-editor/src/utils/toPrecisedFloat';

const { TOOLS } = FilerobotImageEditor;

// const saveFnRef = {};
const cropFolderPresets = [
  {
    titleKey: 'socialMedia', // will be translated into Social Media as backend contains this translation key
    icon: Social, // React component, string or HTML Element
    groups: [
      {
        titleKey: 'linkedIn',
        items: [
          {
            titleKey: 'profilePhoto',
            width: 400,
            height: 400,
            descriptionKey: 'liProfilePhotoSize',
            disableManualResize: false,
          },
          {
            titleKey: 'profileCoverPhoto',
            width: 1584,
            height: 396,
            descriptionKey: 'liProfileCoverPhotoSize',
          },
          {
            titleKey: 'blogPostPhoto',
            width: 1200,
            height: 627,
            descriptionKey: 'liBlogPostPhotoSize',
          },
          {
            titleKey: 'companyLogo',
            width: 300,
            height: 300,
            descriptionKey: 'liCompanyLogoSize',
          },
          {
            titleKey: 'companyPageCover',
            width: 1128,
            height: 191,
            descriptionKey: 'liCompanyPageCoverSize',
          },
        ],
      },
      {
        titleKey: 'twitter',
        items: [
          {
            titleKey: 'profilePhoto',
            width: 400,
            height: 400,
            descriptionKey: 'twProfilePhotoSize',
          },
          {
            titleKey: 'headerPhoto',
            width: 1500,
            height: 500,
            descriptionKey: 'twHeaderPhotoSize',
          },
          {
            titleKey: 'inStreamPhoto',
            width: 1600,
            height: 1900,
            descriptionKey: 'twInStreamPhotoSize',
          },
        ],
      },
      {
        titleKey: 'instagram',
        items: [
          {
            titleKey: 'profilePhoto',
            width: 320,
            height: 320,
            descriptionKey: 'igProfilePhotoSize',
          },
          {
            titleKey: 'feedPortraitPhoto',
            width: 1080,
            height: 1350,
            descriptionKey: 'igFeedPortraitPhotoSize',
          },
          {
            titleKey: 'feedLandscapePhoto',
            width: 1080,
            height: 566,
            descriptionKey: 'igFeedLandscapePhotoSize',
          },
          {
            titleKey: 'feedSquarePhoto',
            width: 1080,
            height: 1080,
            descriptionKey: 'igFeedSquarePhotoSize',
          },
          {
            titleKey: 'storyPhoto',
            width: 1080,
            height: 1920,
            descriptionKey: 'igStoryPhotoSize',
          },
        ],
      },
      {
        titleKey: 'facebook',
        items: [
          {
            titleKey: 'profilePhoto',
            width: 170,
            height: 170,
            descriptionKey: 'fbProfilePhotoSize',
          },
          {
            titleKey: 'profileCoverPhoto',
            width: 851,
            height: 315,
            descriptionKey: 'fbProfileCoverPhotoSize',
          },
          {
            titleKey: 'eventCoverPhoto',
            width: 1200,
            height: 628,
            descriptionKey: 'fbEventCoverPhotoSize',
          },
          {
            titleKey: 'timelinePhoto',
            width: 1200,
            height: 630,
            descriptionKey: 'fbTimelinePhotoSize',
          },
          {
            titleKey: 'storyPhoto',
            width: 1080,
            height: 1920,
            descriptionKey: 'fbStoryPhotoSize',
          },
        ],
      },
    ],
  },
];

const config = {
  // source:
  //   'https://api.filerobot.com/scaleflex-tests-v5a/v3/get/d8880a7c-94fc-5524-b1de-a61de6650000?version=1638547407275',
  // annotationsCommon: {
  // fill: '#000000', // or should be no color? === undefined
  // stroke: '#000000', // or should be no color? === undefined
  // strokeWidth: 0,
  // shadowOffsetX: 0,
  // shadowOffsetY: 0,
  // shadowBlur: 0,
  // shadowColor: '#000000', // or should be no color? === undefined
  // shadowOpacity: 1,
  // opacity: 1,
  // },
  [TOOLS.CROP]: {
    // maxWidth: 700,
    // maxHeight: 300,
    // noPresets: false, // Hiding crop presets
    // ratio: 4 / 100, // ORIGINAL_CROP, ELLIPSE_CROP, CUSTOM_CROP, ratio's number (10 / 4, 5 / 10...etc.)
    // ratioTitleKey: 'custom',
    // minWidth: 200,
    // minHeight: 300,
    // autoResize: false,
    presetsItems: [
      {
        titleKey: 'classicTv',
        descriptionKey: '4:3',
        ratio: toPrecisedFloat(4 / 3),
        icon: CropClassicTv,
        // disableManualResize: false,
      },
      {
        titleKey: 'cinemascope',
        descriptionKey: '21:9',
        ratio: toPrecisedFloat(21 / 9),
        icon: CropCinemaScope, // optional
      },
    ],
    presetsFolders: cropFolderPresets,
  },
  [TOOLS.ROTATE]: {
    angle: 60,
    componentType: 'slider',
  },
  [TOOLS.IMAGE]: {
    disableUpload: false,
    gallery: [
      {
        originalUrl:
          'https://assets.scaleflex.com/Marketing/Logos/Scaleflex+Logos/PNG/SCALEFLEX+LOGO+-+Color+Dark+text.png?vh=45cac1',
        previewUrl:
          'https://assets.scaleflex.com/Marketing/Logos/Scaleflex+Logos/PNG/SCALEFLEX+LOGO+-+Color+Dark+text.png?vh=45cac1',
      },
      {
        originalUrl:
          'https://assets.scaleflex.com/Marketing/Logos/Filerobot+Logos/Logo+with+Scaleflex/LOGOTYPE+WITH+SCALEFLEX-01-01.png?vh=76c5a7',
        previewUrl:
          'https://assets.scaleflex.com/Marketing/Logos/Filerobot+Logos/Logo+with+Scaleflex/LOGOTYPE+WITH+SCALEFLEX-01-01.png?vh=76c5a7',
      },
      {
        originalUrl:
          'https://assets.scaleflex.com/Marketing/Logos/Filerobot+Logos/Logo+with+Scaleflex/LOGO+WITH+SCALEFLEX-01.png?vh=467711',
        previewUrl:
          'https://assets.scaleflex.com/Marketing/Logos/Filerobot+Logos/Logo+with+Scaleflex/LOGO+WITH+SCALEFLEX-01.png?vh=467711',
      },
      {
        originalUrl:
          'https://assets.scaleflex.com/Marketing/Logos/Filerobot+Logos/Logo+with+Scaleflex/LOGO+WITH+SCALEFLEX+ON+WHITE+BG.png?vh=7ae33c',
        previewUrl:
          'https://assets.scaleflex.com/Marketing/Logos/Filerobot+Logos/Logo+with+Scaleflex/LOGO+WITH+SCALEFLEX+ON+WHITE+BG.png?vh=7ae33c',
      },
      {
        originalUrl:
          'https://assets.scaleflex.com/Marketing/Logos/Filerobot+Logos/Logo+with+Scaleflex/LOGO+WITH+SCALEFLEX+ON+BLACK+BG.png?vh=619469',
        previewUrl:
          'https://assets.scaleflex.com/Marketing/Logos/Filerobot+Logos/Logo+with+Scaleflex/LOGO+WITH+SCALEFLEX+ON+BLACK+BG.png?vh=619469',
      },
      {
        originalUrl:
          'https://assets.scaleflex.com/Marketing/Logos/Filerobot+Logos/Logo+Icon/FILEROBOT+ICON.png?vh=a4578e',
        previewUrl:
          'https://assets.scaleflex.com/Marketing/Logos/Filerobot+Logos/Logo+Icon/FILEROBOT+ICON.png?vh=a4578e',
      },
      {
        originalUrl:
          'https://assets.scaleflex.com/Marketing/Logos/Filerobot+Logos/Logo+Icon/FILEROBOT+ICON+ON+WHITE+BG.png?vh=fa44f7',
        previewUrl:
          'https://assets.scaleflex.com/Marketing/Logos/Filerobot+Logos/Logo+Icon/FILEROBOT+ICON+ON+WHITE+BG.png?vh=fa44f7',
      },
      {
        originalUrl:
          'https://assets.scaleflex.com/Marketing/Logos/Filerobot+Logos/Logo+Vertical/FILEROBOT+LOGO+VERTICAL.png?vh=05c4c3',
        previewUrl:
          'https://assets.scaleflex.com/Marketing/Logos/Filerobot+Logos/Logo+Vertical/FILEROBOT+LOGO+VERTICAL.png?vh=05c4c3',
      },
      {
        originalUrl:
          'https://assets.scaleflex.com/Marketing/Logos/Scaleflex+Logos/PNG/SCALEFLEX+LOGO+-+Grayscale+Dark+text.png?vh=313898',
        previewUrl:
          'https://assets.scaleflex.com/Marketing/Logos/Scaleflex+Logos/PNG/SCALEFLEX+LOGO+-+Grayscale+Dark+text.png?vh=313898',
      },
      {
        originalUrl:
          'https://assets.scaleflex.com/Marketing/Logos/Scaleflex+Logos/Logo+Vertical/SCALEFLEX+LOGO+VERTICAL+WHITE+TEXT.png?vh=fca07b',
        previewUrl:
          'https://assets.scaleflex.com/Marketing/Logos/Scaleflex+Logos/Logo+Vertical/SCALEFLEX+LOGO+VERTICAL+WHITE+TEXT.png?vh=fca07b',
      },
      {
        originalUrl:
          'https://assets.scaleflex.com/Marketing/Logos/Scaleflex+Logos/Logo+Vertical/SCALEFLEX+LOGO+VERTICAL.PNG?vh=9a6fa1',
        previewUrl:
          'https://assets.scaleflex.com/Marketing/Logos/Scaleflex+Logos/Logo+Vertical/SCALEFLEX+LOGO+VERTICAL.PNG?vh=9a6fa1',
      },
    ],
  },
  [TOOLS.WATERMARK]: {
    gallery: [
      'https://assets.scaleflex.com/Marketing/Logos/Scaleflex+Logos/PNG/SCALEFLEX+LOGO+-+Color+Dark+text.png?vh=45cac1',
      'https://assets.scaleflex.com/Marketing/Logos/Filerobot+Logos/Logo+with+Scaleflex/LOGOTYPE+WITH+SCALEFLEX-01-01.png?vh=76c5a7',
      'https://assets.scaleflex.com/Marketing/Logos/Filerobot+Logos/Logo+with+Scaleflex/LOGO+WITH+SCALEFLEX-01.png?vh=467711',
      'https://assets.scaleflex.com/Marketing/Logos/Filerobot+Logos/Logo+with+Scaleflex/LOGO+WITH+SCALEFLEX+ON+WHITE+BG.png?vh=7ae33c',
      'https://assets.scaleflex.com/Marketing/Logos/Filerobot+Logos/Logo+with+Scaleflex/LOGO+WITH+SCALEFLEX+ON+BLACK+BG.png?vh=619469',
      'https://assets.scaleflex.com/Marketing/Logos/Filerobot+Logos/Logo+Icon/FILEROBOT+ICON.png?vh=a4578e',
      'https://assets.scaleflex.com/Marketing/Logos/Filerobot+Logos/Logo+Icon/FILEROBOT+ICON+ON+WHITE+BG.png?vh=fa44f7',
      'https://assets.scaleflex.com/Marketing/Logos/Filerobot+Logos/Logo+Vertical/FILEROBOT+LOGO+VERTICAL.png?vh=05c4c3',
      'https://assets.scaleflex.com/Marketing/Logos/Scaleflex+Logos/PNG/SCALEFLEX+LOGO+-+Grayscale+Dark+text.png?vh=313898',
      'https://assets.scaleflex.com/Marketing/Logos/Scaleflex+Logos/Logo+Vertical/SCALEFLEX+LOGO+VERTICAL+WHITE+TEXT.png?vh=fca07b',
      'https://assets.scaleflex.com/Marketing/Logos/Scaleflex+Logos/Logo+Vertical/SCALEFLEX+LOGO+VERTICAL.PNG?vh=9a6fa1',
    ],
    textScalingRatio: 0.33,
    imageScalingRatio: 0.33,
  },
  [TOOLS.TEXT]: {
    text: 'Filerobot...',
    //   fonts: ['Arial', 'another', { label: 'Tahoma', value: 'Tahoma' }, 'hey-there'], // must be loaded in the website or the user have them on his system
    //   fontFamily: 'test',
    // onFontChange: (newFontFamily, reRenderCanvasFn) => {
    //   if (newFontFamily.toLowerCase() === 'sans-serif') {
    //     //  Load sans-serif font.
    //     reRenderCanvasFn();
    //   }
    // },
  },
  // onBeforeSave: (imageFileInfo) => {
  //   console.log('info', imageFileInfo);
  //   return false;
  // }, //  if function returned `false` then the default behavior (opening modal) won't be called,
  // onSave: (savedImageData, imageDesignState) => {
  //   console.log('🕺🏼 Well, my onSave handler function is fired.');
  //   console.log('🎇Image file is downloading.....');
  //   console.log(
  //     '🔔 Also for you to know, we have the following params passed in the onSave handler:',
  //   );
  //   console.log('▶️Image object: ', savedImageData);
  //   console.log('▶️ Image design state:', imageDesignState);
  //   console.log('CYA👋🏼👋🏼👋🏼');
  //   uriDownload(savedImageData.imageBase64, savedImageData.fullName);
  // },
  // defaultImageFileName: 'Test',
  // theme: {},
  // useBackendTranslations: true, // if false, translations object will be used if not provided default translations will be there.
  // translations: null,
  // language: 'en', // available same as on backend ('en', 'fr', 'de', 'it', 'pt', 'es', 'nl', 'pl', 'ro')
  // avoidChangesNotSavedAlertOnLeave: false, // true => user tries to close the tab and the it is not
  // loadableDesignState: null, // if provided, it will be used in loading the design state, [TODO: NEEDS TO BE IMPROVED]
  // defaultSavedImageType: null, // 'png', 'jpeg' & 'webp' => 'png' must be provided you want the image to be transparent and use elliptical crop || null (defaualt) means use the same provided image extension (extracted from the image's src url), if it was unknwon PNG will be used
  // defaultSavedImageQuality: 0.92, // Min: 0.1, Max: 1, (1% - 100%) applied for 'jpg', 'jpeg' & 'webp' only
  // defaultSavedImageName: '',
  // forceToPngInEllipticalCrop: false, // in case the develop wants to force the saved image to be PNG if there is elliptical crop is done otherwise the provided savedImageType would be used.
  // onClose: () => console.log('Act closing 👅'), // if we have value then close button will be shown unless showBackButton is true then if onClose has value the back button will be shown otherwise nothing will be shown.
  // tabsIds: [TABS.ADJUST, TABS.WATERMARK],
  // savingPixelRatio: 4,
  // previewPixelRatio: window.devicePixelRatio,
  // defaultTabId: TABS.ADJUST,
  // defaultToolId: TOOLS.CROP,
  // showBackButton: true,
  // useCloudimage: true,
  // cloudimage: {
  //   token: 'test',
  //   version: 'v7',
  //   loadableQuery: '',
  //   imageSealing: {
  //     enable: false,
  //     salt: 'test',
  //     charCount: 20,
  //     includeParams: null,
  //   },
  // },
  // observePluginContainerSize: true,
  // showCanvasOnly: true,
  // getCurrentImgDataFnRef: saveFnRef,
  // onModify: (currentDesignState) => {
  //   console.log('current design state', currentDesignState);
  //   const savedImgData = saveFnRef.current({ name: 'Custom name ' });
  //   uriDownload(savedImgData.imageData.imageBase64);
  //   console.log('image after saving', savedImgData);
  // },
  // useZoomPresetsMenu: true,
  // disableZooming: true,
  // noCrossOrigin: false,
};

export default config;
