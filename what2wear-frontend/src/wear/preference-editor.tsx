import React, { useState } from "react"
import {
  GetHandleProps,
  GetRailProps,
  GetTrackProps,
  Handles,
  Rail,
  Slider,
  SliderItem,
  Ticks,
  Tracks
} from "react-compound-slider"
import { RangePreferences } from "./preferences"

// modified from https://react-compound-slider.netlify.app/vertical

// *******************************************************
// RAIL
// *******************************************************
const railOuterStyle = {
  position: 'absolute' as 'absolute',
  height: '100%',
  width: 42,
  transform: 'translate(-50%, 0%)',
  borderRadius: 7,
  cursor: 'pointer',
};

const railInnerStyle = {
  position: 'absolute' as 'absolute',
  height: '100%',
  width: 14,
  transform: 'translate(-50%, 0%)',
  borderRadius: 7,
  pointerEvents: 'none' as 'none',
  backgroundColor: 'rgb(155,155,155)',
};

interface SliderRailProps {
  getRailProps: GetRailProps;
}

export const SliderRail: React.FC<SliderRailProps> = ({ getRailProps }) => {
  return (
    <>
      <div style={railOuterStyle} {...getRailProps()} />
      <div style={railInnerStyle} />
    </>
  );
};

// *******************************************************
// HANDLE COMPONENT
// *******************************************************
interface HandleProps {
  domain: number[];
  handle: SliderItem;
  getHandleProps: GetHandleProps;
}

export const Handle: React.FC<HandleProps> = ({
                                                domain: [min, max],
                                                handle: { id, value, percent },
                                                getHandleProps,
                                              }) => {
  return (
    <>
      <div
        style={{
          top: `${percent}%`,
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          WebkitTapHighlightColor: 'rgba(0,0,0,0)',
          zIndex: 5,
          width: 42,
          height: 28,
          cursor: 'pointer',
          backgroundColor: 'none',
        }}
        {...getHandleProps(id)}
      />
      <div
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        style={{
          top: `${percent}%`,
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          zIndex: 2,
          width: 24,
          height: 24,
          borderRadius: '50%',
          boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.3)',
          backgroundColor: '#D7897E',
        }}
      />
    </>
  );
};

// *******************************************************
// TRACK COMPONENT
// *******************************************************
interface TrackProps {
  source: SliderItem;
  target: SliderItem;
  getTrackProps: GetTrackProps;
  disabled?: boolean;
}

export const Track: React.FC<TrackProps> = ({
                                              source,
                                              target,
                                              getTrackProps,
                                            }) => {
  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 1,
        backgroundColor: '#C55F4E',
        borderRadius: 7,
        cursor: 'pointer',
        width: 14,
        transform: 'translate(-50%, 0%)',
        top: `${source.percent}%`,
        height: `${target.percent - source.percent}%`,
      }}
      {...getTrackProps()}
    />
  );
};

// *******************************************************
// TICK COMPONENT
// *******************************************************
interface TickProps {
  tick: SliderItem;
  format?: (val: number) => string;
}

export const Tick: React.FC<TickProps> = ({ tick, format = d => d }) => {
  return (
    <div>
      <div
        style={{
          position: 'absolute',
          marginTop: -0.5,
          marginLeft: 10,
          height: 1,
          width: 6,
          backgroundColor: 'rgb(200,200,200)',
          top: `${tick.percent}%`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          marginTop: -5,
          marginLeft: 20,
          fontSize: 10,
          top: `${tick.percent}%`,
        }}
      >
        {format(tick.value)}
      </div>
    </div>
  );
};

const sliderStyle: React.CSSProperties = {
  position: "relative",
  height: "400px",
  marginLeft: "45%",
  touchAction: "none",
}

export function ZoneAdjustmentSlider({preference, setPreference}: {preference: RangePreferences<string>, setPreference: (pref: RangePreferences<string>) => void}) {
  const domain = [0, 100]
  const [values, setValues] = useState<readonly number[]>([10, 20, 30])

  const onUpdate = (d: readonly number[]) => {
  }

  const onChange = (d: readonly number[]) => {
    setValues(d)

  }

  return (
    <div style={{ height: 520, width: "100%" }}>
      <Slider
        vertical
        reversed
        mode={2}
        step={1}
        domain={domain}
        rootStyle={sliderStyle}
        onUpdate={onUpdate}
        onChange={onChange}
        values={values}
      >
        <Rail>
          {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
        </Rail>
        <Handles>
          {({ handles, getHandleProps }) => (
            <div className="slider-handles">
              {handles.map(handle => (
                <Handle
                  key={handle.id}
                  handle={handle}
                  domain={domain}
                  getHandleProps={getHandleProps}
                />
              ))}
            </div>
          )}
        </Handles>
        <Tracks left={false} right={false}>
          {({ tracks, getTrackProps }) => (
            <div className="slider-tracks">
              {tracks.map(({ id, source, target }) => (
                <Track
                  key={id}
                  source={source}
                  target={target}
                  getTrackProps={getTrackProps}
                />
              ))}
            </div>
          )}
        </Tracks>
        <Ticks count={5}>
          {({ ticks }) => (
            <div className="slider-ticks">
              {ticks.map(tick => (
                <Tick key={tick.id} tick={tick} />
              ))}
            </div>
          )}
        </Ticks>
      </Slider>
    </div>
  )
}
