import "./styles.css";
import React from "react";
import ReactDOM from "react-dom";
import RGL, { WidthProvider } from "react-grid-layout";
// import silv from "./sylvester.png";
// import { Responsive, WidthProvider } from "react-grid-layout";

// const ReactGridLayout = WidthProvider(Responsive);
const ReactGridLayout = WidthProvider(RGL);

let idCounter = 0;

const getId = () => {
  idCounter++;

  return idCounter.toString();
};

class MinMaxLayout extends React.PureComponent {
  static defaultProps = {
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
    isDroppable: true
  };

  state = {
    layout: [
      { x: 0, y: 0, w: 1, h: 2, i: getId() },
      { x: 0, y: 1, w: 3, h: 2, i: getId() }
    ],
    showGuideLines: false
  };

  generateDOM = () =>
    this.state.layout.map((item) => (
      <div style={{ borderRadius: 5 }} key={item.i} data-grid={item}>
        <span>{item.i}</span>
      </div>
    ));

  render() {
    const rows =
      this.state.layout.reduce((a, i) => {
        return Math.max(a, i.y + i.h);
      }, 1) * 2;

    console.log(this.state.layout);
    return (
      <React.Fragment>
        <div className="page-wrapper">
          <div className="left-panel">
            {/* <div>
              <button onClick={this.addNewItem}>Add item</button>
            </div> */}
            <h3>Available widgets</h3>
            <div>
              <div
                className="droppable-element"
                draggable={true}
                unselectable="on"
                key="miau"
                onDragStart={(e) => e.dataTransfer.setData("text/plain", "")}
                data-grid={{ h: 2, w: 2, minW: 2 }}
              >
                Droppable Element (Drag me!)
              </div>
            </div>
          </div>

          <div className="right-panel">
            <div className="dash-wraper">
              {this.state.showGuideLines && (
                <div className="miau">
                  {new Array(rows * 6)
                    .fill(null)
                    .map((_, index) => index)
                    .map((v) => {
                      return <div className="decoy"></div>;
                    })}
                </div>
              )}
              <ReactGridLayout
                {...this.props}
                isDroppable={true}
                onLayoutChange={(layout) => {
                  // console.log("onlayout change", e);
                  // this.setState({ layout });
                }}
                onDrop={(layout, layoutItem, _event) => {
                  console.log(layoutItem);
                  this.setState({ layout, showGuideLines: false });
                }}
                onDragStart={(e) => {
                  this.setState({ showGuideLines: true });
                }}
                onResizeStart={(e) => {
                  this.setState({ showGuideLines: true });
                }}
                onDragStop={(e) => {
                  this.setState({ showGuideLines: false });
                }}
                onResizeStop={(e) => {
                  this.setState({ showGuideLines: false });
                }}
              >
                {this.generateDOM()}
              </ReactGridLayout>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  addNewItem = () => {
    const { layout } = this.state;
    const newItem = { x: 0, y: 0, w: 3, h: 3, i: getId() };

    if (layout.some((item) => item.x === 0 && item.y === 0)) {
      this.setState({
        layout: layout
          .map((item) => {
            if (item.x === 0) {
              return { y: item.y++, ...item };
            }

            return item;
          })
          .concat([newItem])
      });
    } else {
      this.setState({ layout: layout.concat([newItem]) });
    }
  };
}

module.exports = MinMaxLayout;

if (require.main === module) {
  require("../test-hook.jsx")(module.exports);
}

const rootElement = document.getElementById("root");
ReactDOM.render(<MinMaxLayout />, rootElement);
