/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@scaleflex/ui/core/button';
import LockOutline from '@scaleflex/icons/lock-outline';
import UnlockOutline from '@scaleflex/icons/unlock-outline';

/** Internal Dependencies */
import { SET_RESIZE, ZOOM_CANVAS } from 'actions';
import restrictNumber from 'utils/restrictNumber';
import { useStore } from 'hooks';
import getProperDimensions from 'utils/getProperDimensions';
import getSizeAfterRotation from 'utils/getSizeAfterRotation';
import getZoomFitFactor from 'utils/getZoomFitFactor';
import {
  StyledResizeWrapper,
  StyledResizeInput,
  StyledRatioLockIcon,
  StyledXLabel,
} from './Resize.styled';

const Resize = ({
  onChange,
  currentSize,
  hideResetButton,
  alignLeft,
  doNotAutoAdjust,
}) => {
  const {
    dispatch,
    originalImage,
    resize,
    shownImageDimensions,
    adjustments: { crop, rotation = 0 },
    theme,
    t,
  } = useStore();

  const changeResize = (e) => {
    const { name, value } = e.target;

    const originalImgSizeAfterRotation = getSizeAfterRotation(
      originalImage.width,
      originalImage.height,
      rotation,
    );
    const newResize = {
      [name]: restrictNumber(value, 1),
    };
    const isHeight = name === 'height';
    const secondDimensionName = isHeight ? 'width' : 'height';
    const isRatioUnlocked = currentSize.ratioUnlocked ?? resize.ratioUnlocked;
    if (!isRatioUnlocked) {
      const originalImgRatio =
        originalImgSizeAfterRotation.width /
        originalImgSizeAfterRotation.height;
      newResize[secondDimensionName] = isHeight
        ? Math.round(newResize[name] * originalImgRatio)
        : Math.round(newResize[name] / originalImgRatio);
    }

    if (typeof onChange === 'function') {
      onChange(newResize);
      return;
    }

    dispatch({
      type: SET_RESIZE,
      payload: newResize,
    });
    // Fit if there was no resized width/height before for avoiding jumping on change resize
    // as we are simulating zoom relattive to original image dimensions but not applying the real original image dimensions
    if (!resize.width || !resize.height) {
      const dimensUsedInFit =
        (crop.width && crop.height && crop) || shownImageDimensions;
      dispatch({
        type: ZOOM_CANVAS,
        payload: {
          factor: getZoomFitFactor(dimensUsedInFit, newResize),
        },
      });
    }
  };

  React.useEffect(() => {
    if (doNotAutoAdjust) {
      return;
    }
    if (resize.maxWidth === Infinity && resize.maxHeight === Infinity) {
      changeResize({ target: { name: 'width', value: originalImage.width } });
    }
    if (!resize.maxHeight && !resize.maxWidth) {
      return;
    }
    if (resize.maxHeight === null) {
      if (resize.maxWidth > originalImage.width) {
        return;
      }
      changeResize({ target: { name: 'width', value: resize.maxWidth } });
      return;
    }
    if (resize.maxWidth === null) {
      if (resize.maxHeight > originalImage.height) {
        return;
      }
      changeResize({ target: { name: 'height', value: resize.maxHeight } });
      return;
    }
    const maxMaxWidth = Math.min(resize.maxWidth, originalImage.width);
    const maxMaxHeight = Math.min(resize.maxHeight, originalImage.height);
    // calculate if resize.maxWidth or resize.maxHeight will be the contstraining dimension, factoring in originalImage dimensions
    const originalWidth = originalImage.width;
    const originalHeight = originalImage.height;
    const maxWidthPercentage = maxMaxWidth / originalWidth;
    const maxHeightPercentage = maxMaxHeight / originalHeight;
    const maxWidthIsContstraining = maxWidthPercentage < maxHeightPercentage;
    if (maxWidthIsContstraining) {
      changeResize({ target: { name: 'width', value: maxMaxWidth } });
    } else {
      changeResize({ target: { name: 'height', value: maxMaxHeight } });
    }
  }, [originalImage, resize.maxWidth, resize.maxHeight]);

  const toggleRatioLock = () => {
    if (typeof onChange === 'function') {
      onChange({ ratioUnlocked: !currentSize.ratioUnlocked });
      return;
    }

    dispatch({
      type: SET_RESIZE,
      payload: {
        ratioUnlocked: !resize.ratioUnlocked,
      },
    });
  };

  const resetResize = () => {
    dispatch({
      type: SET_RESIZE,
      payload: {
        width: null,
        height: null,
        ratioUnlocked: false,
      },
    });
    const dimensUsedInFit =
      (crop.width && crop.height && crop) || shownImageDimensions;
    // Fitting after reset resize
    dispatch({
      type: ZOOM_CANVAS,
      payload: {
        factor: getZoomFitFactor(dimensUsedInFit, dimensUsedInFit),
      },
    });
  };

  const isOriginalSize =
    (!resize.width && !resize.height) ||
    (originalImage.width === resize.width &&
      originalImage.height === resize.height);

  const dimensions = getProperDimensions(
    ((currentSize.width || currentSize.height) && currentSize) || resize,
    crop,
    shownImageDimensions,
    originalImage,
    rotation,
  );

  const isManualChangeDisabled = resize.manualChangeDisabled;
  return (
    <StyledResizeWrapper
      className="FIE_resize-tool-options"
      alignLeft={alignLeft}
    >
      <StyledResizeInput
        className="FIE_resize-width-option"
        value={dimensions.width}
        name="width"
        onChange={isManualChangeDisabled ? undefined : changeResize}
        inputMode="numeric"
        title={t('resizeWidthTitle')}
        type="number"
        size="sm"
        placeholder="Width"
        noLeftMargin={alignLeft}
        disabled={isManualChangeDisabled}
      />
      <StyledXLabel className="FIE_resize-x-label">x</StyledXLabel>
      <StyledResizeInput
        className="FIE_resize-height-option"
        value={dimensions.height}
        name="height"
        onChange={isManualChangeDisabled ? undefined : changeResize}
        inputMode="numeric"
        title={t('resizeHeightTitle')}
        type="number"
        size="sm"
        placeholder="Height"
        disabled={isManualChangeDisabled}
      />
      <StyledRatioLockIcon
        className="FIE_resize-ratio-locker"
        title={t('toggleRatioLockTitle')}
        onClick={isManualChangeDisabled ? undefined : toggleRatioLock}
        color="link"
        size="sm"
        disabled={isManualChangeDisabled}
      >
        {currentSize.ratioUnlocked || resize.ratioUnlocked ? (
          <UnlockOutline color={theme.palette['icons-secondary']} />
        ) : (
          <LockOutline color={theme.palette['icons-secondary']} />
        )}
      </StyledRatioLockIcon>
      {!hideResetButton && (
        <Button
          className="FIE_resize-reset-button"
          size="sm"
          onClick={
            isOriginalSize || isManualChangeDisabled ? undefined : resetResize
          }
          disabled={isOriginalSize || isManualChangeDisabled}
          title={t('resetSize')}
        >
          {t('reset')}
        </Button>
      )}
    </StyledResizeWrapper>
  );
};

Resize.defaultProps = {
  onChange: undefined,
  currentSize: {},
  hideResetButton: false,
  alignLeft: false,
};

Resize.propTypes = {
  alignLeft: PropTypes.bool,
  hideResetButton: PropTypes.bool,
  onChange: PropTypes.func,
  currentSize: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
    ratioUnlocked: false,
  }),
};

export default Resize;
