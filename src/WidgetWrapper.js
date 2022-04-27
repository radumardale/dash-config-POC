import React from 'react';

const WidgetWrapper = React.forwardRef(
  ({ style, className, title = 'Unnamed widget yet', ...props }, ref) => {
    const { children, ...restOfProps } = props;
    return (
      <div
        style={{
          // /* styles */ position: 'relative',
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridTemplateRows: 'max-content 1fr',
          ...style,
        }}
        className={className}
        ref={ref}
        {...restOfProps}
      >
        <div className="widget-header">
          <span className="widget-title">{title}</span>
        </div>
        <div>{props.children}</div>
      </div>
    );
  }
);

export default WidgetWrapper;
