import React, { useState } from 'react';
import {
  UilArrowLeft,
  UilArrowRight
} from '@iconscout/react-unicons';
import { Button, Col, Row, Steps } from 'antd';

const { Step }:any = Steps;

interface StepsWidgetProps {
  isvertical?: boolean;
  size?: 'default' | 'small';
  current?: number;
  direction?: 'horizontal' | 'vertical';
  status?: 'wait' | 'process' | 'finish' | 'error';
  progressDot?: boolean;
  steps?: any;
  isswitch?: boolean;
  navigation?: boolean;
  onNext?: (currents:number) => void;
  onPrev?: (currents:number) => void;
  onDone?: () => void;
  onChange?: (currents:number) => void;
  children?: React.ReactNode;
  height?: number;
  isfinished?: boolean;
}

interface Item {
  title: string;
  icon?: React.ReactNode;
  content?: React.ReactNode;
  className?: string;
}

function StepsWidget({
  isvertical,
  size,
  current,
  direction,
  status,
  progressDot,
  steps,
  isswitch,
  navigation,
  onNext,
  onPrev,
  onDone,
  onChange,
  children,
  height,
  isfinished,
}:StepsWidgetProps) {
  const [state, setState] = useState({
    currents: current,
  });

  const next = () => {
    const currents = (state.currents ?? 0) + 1;
    setState({ currents });
    if (onNext) {
      onNext(currents);
    }
  };

  const prev = () => {
    const currents = (state.currents ?? 0) - 1;
    setState({ currents });
    if (onPrev) {
      onPrev(currents);
    }
  };

  const { currents } = state;

  const stepStyle = {
    marginBottom: 60,
    boxShadow: '0px -1px 0 0 #e8e8e8 inset',
  };

  const onChanges = (curr:number) => {
    setState({ currents: curr });
    if (onChange) onChange(curr);
  };

  return !isswitch ? (
    <Steps
      type={navigation ? 'navigation' : 'default'}
      style={navigation ? stepStyle : {}}
      size={size}
      current={navigation ? currents : current}
      direction={direction}
      status={status}
      progressDot={progressDot}
      onChange={onChanges}
    >
      {children}
    </Steps>
  ) : (
    <>
      <Steps current={currents} direction={direction} status={status} progressDot={progressDot} size={size}>
        {steps !== undefined &&
          steps.map((item:Item) => (
            <Step
              className={item.className && item.className}
              icon={item.icon && item.icon}
              key={item.title}
              title={item.title}
            />
          ))}
      </Steps>
      {isvertical ? (
        <div className="steps-wrapper">
          <div
            className="steps-content"
            style={{ minHeight: height, display: 'flex', justifyContent: 'center', marginTop: 100 }}
          >
            {state.currents !== undefined ? steps[state.currents]?.content ?? {} : {}}
          </div>

          {!isfinished && (
            <>
              <div className="step-action-wrap">
                <div className="step-action-inner">
                  <Row>
                    <Col xs={24}>
                      <div className="steps-action">
                        {state.currents !== undefined ? state.currents > 0 : {} && (
                          <Button
                            className="dark:border-white/10 dark:bg-white/10 dark:text-white/[.87] hover:border-primary hover:text-primary"
                            onClick={() => prev()}
                          >
                            <UilArrowLeft />
                            Previous
                          </Button>
                        )}

                        {state.currents !== undefined ? state.currents < steps.length - 1 : {} && (
                          <Button className="btn-next" type="primary" onClick={() => next()}>
                            Save & Next
                            <UilArrowRight />
                          </Button>
                        )}

                        {state.currents === steps.length - 1 && (
                          <Button type="primary" onClick={onDone}>
                            Done
                          </Button>
                        )}
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <>
          <div
            className="steps-content"
            style={{ minHeight: height, display: 'flex', justifyContent: 'center', marginTop: 100 }}
          >
            {state.currents !== undefined ? steps[state.currents].content : {}}
          </div>

          {!isfinished && (
            <>
              <div className="step-action-wrap">
                <div className="step-action-inner">
                  <Row>
                    <Col xs={24}>
                      <div className="steps-action">
                        {state.currents !== undefined ? state.currents > 0 : {} && (
                          <Button
                            className="dark:border-white/10 dark:bg-white/10 dark:text-white/[.87] hover:border-primary hover:text-primary"
                            onClick={() => prev()}
                          >
                            <UilArrowLeft />
                            Previous
                          </Button>
                        )}

                        {state.currents !== undefined ? state.currents < steps.length - 1 : {} && (
                          <Button className="btn-next" type="primary" onClick={() => next()}>
                            Save & Next
                            <UilArrowRight />
                          </Button>
                        )}

                        {state.currents === steps.length - 1 && (
                          <Button type="primary" onClick={onDone}>
                            Done
                          </Button>
                        )}
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

export { Step, StepsWidget };
