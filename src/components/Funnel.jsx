import { Children, isValidElement, useMemo, useState } from "react";

export const Funnel = ({ steps, step, children }) => {
  const validChildren = Children.toArray(children).filter(
    (child) => isValidElement(child) && steps.includes(child.props.name)
  );

  const targetStep = validChildren.find((child) => child.props.name === step);

  return <>{targetStep || null}</>;
};

export const Step = ({ children }) => {
  return <>{children}</>;
};

export const useFunnel = (steps, defaultStep) => {
  const [stepState, setStepState] = useState(
    steps.includes(defaultStep) ? defaultStep : steps[0]
  );

  const FunnelComponent = useMemo(() => {
    const Component = (props) => (
      <Funnel steps={steps} step={stepState} {...props} />
    );
    return Component;
  }, [steps, stepState]);

  return [FunnelComponent, setStepState];
};
