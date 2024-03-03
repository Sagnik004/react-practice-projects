import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const Stepper = ({ stepsConfig = [] }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isStepsComplete, setIsStepsComplete] = useState(false);
  const [margins, setMargins] = useState({
    marginLeft: 0,
    marginRight: 0,
  });

  const stepRef = useRef([]);

  useEffect(() => {
    setMargins({
      marginLeft: stepRef.current[0].offsetWidth / 2,
      marginRight: stepRef.current[stepsConfig.length - 1].offsetWidth / 2,
    });
  }, [stepRef, stepsConfig]);

  const setActiveAndCompleteClass = (index) => {
    let classNameToAdd = '';

    if (currentStep > index + 1 || isStepsComplete) {
      classNameToAdd += 'complete';
    }
    if (currentStep === index + 1) {
      classNameToAdd += ' active';
    }

    return classNameToAdd;
  };

  const handleStepsBtnClick = () => {
    setCurrentStep((prevStep) => {
      if (prevStep === stepsConfig.length) {
        setIsStepsComplete(true);
        return prevStep;
      } else {
        return prevStep + 1;
      }
    });
  };

  const calculateProgressBarWidth = () => {
    console.log('currentStep: ', currentStep);
    console.log('stepsConfig.length', stepsConfig.length);
    return ((currentStep - 1) / (stepsConfig.length - 1)) * 100;
  };

  if (stepsConfig.length < 1) {
    return <></>;
  }

  const ActiveComponent = stepsConfig[currentStep - 1]?.Component;

  return (
    <>
      {/* Stepper progress component */}
      <div className="stepper">
        {stepsConfig.map((step, index) => {
          return (
            <div
              key={step.name}
              ref={(el) => (stepRef.current[index] = el)}
              className={`step ${setActiveAndCompleteClass(index)}`}
            >
              <div className="step-number">
                {/* For completed steps mark with tick, pending ones will show step# */}
                {currentStep > index + 1 || isStepsComplete ? (
                  <span>&#10003;</span>
                ) : (
                  index + 1
                )}
              </div>
              <div className="step-name">{step.name}</div>
            </div>
          );
        })}

        <div
          className="progress-bar"
          style={{
            width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`,
            marginLeft: margins.marginLeft,
            marginRight: margins.marginRight,
          }}
        >
          <div
            className="progress"
            style={{ width: `${calculateProgressBarWidth()}%` }}
          ></div>
        </div>
      </div>

      <ActiveComponent />

      {!isStepsComplete && (
        <button onClick={handleStepsBtnClick}>
          {currentStep === stepsConfig.length ? 'Finish' : 'Next'}
        </button>
      )}
    </>
  );
};

Stepper.propTypes = {
  stepsConfig: PropTypes.array,
};

export default Stepper;
