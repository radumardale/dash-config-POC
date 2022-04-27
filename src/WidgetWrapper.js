import React from 'react';
import ReactDOM from 'react-dom';

const WidgetWrapper = React.forwardRef(
  ({ style, className, title = 'Unnamed widget yet', ...props }, ref) => {
    const { children, ...restOfProps } = props;
    return (
      <div
        style={{
          /* styles */ position: 'relative',
          ...style,
        }}
        className={className}
        ref={ref}
        {...restOfProps}
      >
        <div>
          <h2>{title}</h2>
        </div>
        <div>{props.children}</div>
      </div>
    );
  }
);

export default WidgetWrapper;
