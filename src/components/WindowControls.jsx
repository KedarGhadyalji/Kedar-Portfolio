import useWindowStore from "#store/window";

const WindowControls = ({ target }) => {
  const { closeWindow } = useWindowStore();
  console.log(target); // Debug the target value

  return (
    <div id="window-controls">
      <div className="close" onClick={() => closeWindow(target)} />
      <div className="minimize" />
      <div className="maximize" />
    </div>
  );
};

export default WindowControls;
