import { Box } from '@chakra-ui/layout';
import {
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderTrack,
} from '@chakra-ui/slider';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import 'src/styles/components/AppInputRange.scss';

interface IAppInputRange {
  countDistance?: number;
  onChange?: (value: number) => void;
  value?: number;
  disabled?: boolean;
}

const AppInputRange: React.FC<IAppInputRange> = ({
  countDistance = 4,
  onChange,
  value = 0,
  disabled = false,
}) => {
  const [sliderValue, setSliderValue] = useState(value);
  const [showPercentLabel, setShowPercentLabel] = useState(false);

  useEffect(() => {
    setSliderValue(value);
  }, [value]);

  const labelStyles = {
    fontSize: 'sm',
    zIndex: 100,
    transform: 'auto',
    translateX: '-50%',
    translateY: '-50%',
  };

  const _renderSliderMark = (value: number, currentValue: number) => {
    if (value > currentValue) {
      return (
        <div className="slider-mark">
          <div className="decor-slider"></div>
        </div>
      );
    } else
      return (
        <div className="slider-mark-active">
          <div className="decor-slider-active"></div>
        </div>
      );
  };

  const handleChangeSlider = (val: number) => {
    if (disabled) return;
    setSliderValue(val);
    if (onChange) {
      onChange(val);
    }
  };

  const onMouseEnter = () => setShowPercentLabel(true);
  const onMouseLeave = () => setShowPercentLabel(false);

  return (
    <Box pb={2} px={2}>
      <Slider
        aria-label="slider-ex-6"
        onChange={handleChangeSlider}
        value={sliderValue}
        height="4px"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {_.range(countDistance).map((count, index) => {
          return (
            <SliderMark
              value={(100 / countDistance) * count}
              {...labelStyles}
              key={`${index}_mark`}
            >
              {_renderSliderMark((100 / countDistance) * count, sliderValue)}
            </SliderMark>
          );
        })}
        <SliderMark value={100} {...labelStyles}>
          {_renderSliderMark(100, sliderValue)}
        </SliderMark>
        {showPercentLabel && (
          <SliderMark
            value={sliderValue}
            textAlign="center"
            color="white"
            className="percent-slider"
          >
            {sliderValue}%
          </SliderMark>
        )}
        <SliderTrack background={'border.300'} overflow="visible"></SliderTrack>
        <SliderFilledTrack background={'main.100'} />
        <div
          style={{
            left: `${sliderValue}%`,
            position: 'absolute',
          }}
          className="slider-thumb"
        ></div>
      </Slider>
    </Box>
  );
};

export default AppInputRange;
