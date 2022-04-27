import * as React from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import { dashboardLayout, availableWidgets } from './dashboard-data';
import WidgetWrapper from './WidgetWrapper';
// import silv from "./sylvester.png";
// import { Responsive, WidthProvider } from "react-grid-layout";

// const ReactGridLayout = WidthProvider(Responsive);
const ReactGridLayout = WidthProvider(RGL);

const Dashboard = () => {
  const [isEditMode, setIsEditMode] = React.useState(true);
  const [compactType, setCompactType] = React.useState('vertical');
  const [showGuideLines, setShowGuideLines] = React.useState(false);
  const [layout, setLayout] = React.useState(dashboardLayout);

  // React.useEffect(() => {
  //   setIsMounted(true);
  // }, []);

  const addWidget = (addedWidget) => {
    const widget = { ...addedWidget, x: 0, y: 0, w: 2, h: 2 };

    if (layout.some((item) => item.x === 0 && item.y === 0)) {
      setLayout(
        layout
          .map((item) => {
            if (item.x === 0) {
              return { y: item.y++, ...item };
            }

            return item;
          })
          .concat([widget])
      );
    } else {
      setLayout(layout.concat([widget]));
    }
  };

  const rows =
    layout.reduce((a, i) => {
      return Math.max(a, i.y + i.h);
    }, 1) * 3;
  // console.log(layout, 'rows = ', rows);

  const unusedWidgets = availableWidgets.filter((w) =>
    layout.some((ww) => ww.id === w.id) ? false : true
  );

  const defaultProps = {
    isDraggable: isEditMode,
    isResizable: isEditMode,
    items: 15,
    rowHeight: 100,
    preventCollision: false,
    cols: 6,
    // cols: { lg: 6, md: 6, sm: 6, xs: 6, xxs: 6 },
    // ---
    margin: [10, 10],
    autoSize: true,
    // verticalCompact: false,
    compactType: compactType, // null, "horizontal", "vertical"
    isDroppable: true,
  };

  return (
    <React.Fragment>
      <div className="page-wrapper">
        <div className="left-panel">
          {isEditMode && (
            <div className="left-top-section">
              <span>Available widgets</span>
              <div className="drop-removed-items">
                <span>
                  Drag items here to remove them from the summary layout.
                </span>
              </div>
            </div>
          )}

          {isEditMode && (
            <div className="available-widgets-wrapper">
              <span>Content (click to add to dashboard)</span>

              {unusedWidgets.map((w) => {
                return (
                  <WidgetWrapper
                    key={w.id}
                    style={{ minHeight: '200px' }}
                    className="unused-widget"
                    draggable={false}
                    unselectable="on"
                    title={w.title}
                    widgetId={w.id}
                    onClick={() => {
                      addWidget(w);
                    }}
                  >
                    {/* Droppable Element (Drag me!) */}
                  </WidgetWrapper>
                );
              })}
            </div>
          )}

          <div>
            <label>
              <input
                type="checkbox"
                checked={isEditMode}
                onChange={() => {
                  setIsEditMode(!isEditMode);
                }}
              />
              Edit mode
            </label>
            <div>
              <label>Compact type</label>
              <select
                value={compactType}
                onChange={(e) => {
                  setCompactType(e.target.value);
                }}
              >
                <option value="vertical">vertical</option>
                <option value="horizontal">horizontal</option>
              </select>
            </div>
          </div>
        </div>

        <div className="right-panel">
          <div className="dash-wrapper">
            {showGuideLines && (
              <div className="grid-decoy-wrapper">
                {new Array(rows * 6)
                  .fill(null)
                  .map((_, index) => index)
                  .map((v) => {
                    return <div className="decoy"></div>;
                  })}
              </div>
            )}
            <ReactGridLayout
              {...defaultProps}
              isDroppable={true}
              onLayoutChange={(l) => {
                // console.log('onlayout change', l);
                // if (isMounted) {
                //   setLayout(l);
                // }
              }}
              onDragStart={(e) => {
                setShowGuideLines(true);
              }}
              onResizeStart={(e) => {
                setShowGuideLines(true);
              }}
              onDragStop={(e) => {
                setShowGuideLines(false);
              }}
              onResizeStop={(e) => {
                setShowGuideLines(false);
              }}
            >
              {layout.map((item) => (
                <WidgetWrapper
                  style={{ borderRadius: 5 }}
                  key={item.id}
                  data-grid={item}
                  widgetId={item.id}
                  title={item.title}
                  onWidgetRemoved={(removeId) => {
                    setLayout((l) => l.filter((w) => w.id !== removeId));
                  }}
                >
                  {/* <span>{item.id}</span> */}
                </WidgetWrapper>
              ))}
            </ReactGridLayout>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
