import * as React from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import { dashboardLayout, availableWidgets } from './dashboard-data';
import WidgetWrapper from './WidgetWrapper';
const ReactGridLayout = WidthProvider(RGL);

const Dashboard = () => {
  const [isEditMode, setIsEditMode] = React.useState(true);
  const [compactType, setCompactType] = React.useState('vertical');
  const [showGuideLines, setShowGuideLines] = React.useState(false);
  const [layout, setLayout] = React.useState(dashboardLayout);

  const addWidget = (addedWidget) => {
    const widget = {
      ...addedWidget,
      x: 0,
      y: 0,
      w: Math.max(addedWidget.minW, 1),
      h: Math.max(addedWidget.minH, 1),
    };

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
          {/* {isEditMode && (
            <div className="left-top-section">
              <span>Available widgets</span>
              <div
                className="drop-removed-items"
                onDrop={(e) => {
                  e.preventDefault();
                  console.log('dropped!');
                }}
              >
                <span>
                  Drag items here to remove them from the summary layout.
                </span>
              </div>
            </div>
          )}
 */}
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
                    onDragStart={(e) => {
                      var img = new Image();
                      img.src =
                        'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
                      e.dataTransfer.setDragImage(img, 10, 10);
                      e.dataTransfer.dropEffect = 'move';
                    }}
                    onDragEnd={(e) => {
                      // console.log('!!', e, e.target);
                      // e.target.style.width = '';
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
                    return <div key={`decoy-${v}`} className="decoy"></div>;
                  })}
              </div>
            )}
            <ReactGridLayout
              {...defaultProps}
              autoSize={false}
              droppingItem={{ i: 'miay', w: 2, h: 2 }}
              isDroppable={true}
              onLayoutChange={(l) => {
                // console.log('onlayout change', l);
                // if (isMounted) {
                //   setLayout(l);
                // }
              }}
              onDrop={(...e) => {
                console.log(e);
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
              layout={layout}
            >
              {layout.map((item) => (
                <WidgetWrapper
                  style={{ borderRadius: 5 }}
                  key={item.id}
                  data-grid={item}
                  widgetId={item.id}
                  title={item.title}
                  className={isEditMode ? 'widget-edit-mode' : ''}
                  onWidgetRemoved={(removeId) => {
                    setLayout((l) => l.filter((w) => w.id !== removeId));
                  }}
                >
                  {!item.minW && !item.minH && (
                    <span className="info-message">
                      I dont have a min size - you can resize me how you see fit
                    </span>
                  )}
                  {(item.minW || item.minH) && (
                    <span className="info-message">
                      I have a min size of (w x h): {item.minW} x {item.minH}
                    </span>
                  )}
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
