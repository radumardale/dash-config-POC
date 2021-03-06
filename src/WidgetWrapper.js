import React from 'react';

const WidgetWrapper = React.forwardRef(
  (
    {
      style,
      className,
      title = 'Unnamed widget yet',
      onWidgetRemoved = () => {},
      widgetId = 'not-yet',
      ...props
    },
    ref
  ) => {
    const { children, ...restOfProps } = props;
    return (
      <div
        style={{
          // /* styles */ position: 'relative',
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridTemplateRows: 'max-content 1fr',
          borderRadius: '8px',
          ...style,
        }}
        className={className}
        ref={ref}
        {...restOfProps}
      >
        <div className="widget-header">
          <span className="widget-title">{title}</span>
        </div>
        <div
          style={{
            backgroundImage: `url('/images/${widgetId}.svg')`,
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {props.children}
        </div>

        <span
          className="remove-widget"
          onClick={() => onWidgetRemoved(widgetId)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
              clipRule="evenodd"
            />
          </svg>
          Remove
        </span>
      </div>
    );
  }
);

export default WidgetWrapper;
