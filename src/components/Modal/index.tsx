import "./style.css";
export const Modal = (props: any) => {
    if (!props.visible) {
      return null;
    }
    return (
      <>
        <div className="modalFixedBg">
          <div style={{ position: "relative" }}>
            <div className="modalClose" onClick={props.onClose}>
              X
            </div>
            <div className="modalContainer">{props.children}</div>
          </div>
        </div>
      </>
    );
  };
  