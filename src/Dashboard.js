import * as React from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import WidgetWrapper from './WidgetWrapper';
// import silv from "./sylvester.png";
// import { Responsive, WidthProvider } from "react-grid-layout";

// const ReactGridLayout = WidthProvider(Responsive);
const ReactGridLayout = WidthProvider(RGL);

let idCounter = 0;

const getId = () => {
  idCounter++;

  return idCounter.toString();
};

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
    margin: [10, 10],
    autoSize: true,
    // verticalCompact: false,
    compactType: null, // null, "horizontal", "vertical"
    isDroppable: true,
  };

  const [showGuideLines, setShowGuideLines] = React.useState(false);
  const [layout, setLayout] = React.useState([
    { x: 0, y: 0, w: 1, h: 2, i: '1' },
    { x: 0, y: 1, w: 3, h: 2, i: '2' },
  ]);

  // state = {
  //   layout: ,
  //   showGuideLines: false,
  // };

  const rows =
    layout.reduce((a, i) => {
      return Math.max(a, i.y + i.h);
    }, 1) * 2;

  // console.log(layout);
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

          <div>
            <div
              className="droppable-element"
              draggable={true}
              unselectable="on"
              key="miau"
              onDragStart={(e) => e.dataTransfer.setData('text/plain', '')}
              data-grid={{ h: 2, w: 2, minW: 2 }}
            >
              Droppable Element (Drag me!)
            </div>
          </div>
        </div>

        <div className="right-panel">
          <div className="dash-wraper">
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
                  key={item.i}
                  data-grid={item}
                >
                  <span>{item.i}</span>
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
