import * as React from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import { dashboardLayout } from './dashboard-data';
import WidgetWrapper from './WidgetWrapper';
// import silv from "./sylvester.png";
// import { Responsive, WidthProvider } from "react-grid-layout";

// const ReactGridLayout = WidthProvider(Responsive);
const ReactGridLayout = WidthProvider(RGL);

const Dashboard = () => {
  const defaultProps = {
    isDraggable: true,
    isResizable: true,
    items: 15,
    rowHeight: 100,
    preventCollision: false,
    cols: 6,
    // cols: { lg: 6, md: 6, sm: 6, xs: 6, xxs: 6 },
    // ---
    margin: [20, 20],
    autoSize: true,
    // verticalCompact: false,
    compactType: null, // null, "horizontal", "vertical"
    isDroppable: true,
  };

  const [showGuideLines, setShowGuideLines] = React.useState(false);
  const [layout, setLayout] = React.useState(dashboardLayout);

  const rows =
    layout.reduce((a, i) => {
      return Math.max(a, i.y + i.h);
    }, 1) * 2;

  return (
    <React.Fragment>
      <div className="page-wrapper">
        <div className="left-panel">
          <div className="left-top-section">
            <span>Available widgets</span>

            <div className="drop-removed-items">
              <span>
                Drag items here to remove them from the summary layout.
              </span>
            </div>
          </div>

          <div className="available-widgets-wrapper">
            <span>Content</span>
            <WidgetWrapper
              className="droppable-element"
              draggable={true}
              unselectable="on"
              key="miau"
              onDragStart={(e) => e.dataTransfer.setData('text/plain', '')}
              data-grid={{ h: 2, w: 2, minW: 2 }}
            >
              Droppable Element (Drag me!)
            </WidgetWrapper>
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
              onLayoutChange={(layout) => {
                // console.log("onlayout change", e);
                // this.setState({ layout });
              }}
              onDrop={(layout, layoutItem, _event) => {
                setLayout(layout);
                setShowGuideLines(false);
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
