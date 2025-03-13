import "./CompatibleGamesSectionSkeletonLoader.css";

function CompatibleGamesSectionSkeletonLoader() {
  return (
    <>
    <div className="single-compatible-game skeleton">
      <div className="image load"></div>

      <div className="text">
        <div className="fake-p load"></div>
        <div className="fake-p load"></div>
        <div className="fake-p load"></div>

        <hr />

        <div className="game-settings">
          <div className="single-setting">
            <div className="fake-img load"></div>

            <div className="fake-p load"></div>

            <small>Graphics</small>
          </div>

          <div className="single-setting">
            <div className="fake-img load"></div>

            <div className="fake-p load"></div>

            <small>Frame Rate</small>
          </div>

          <div className="single-setting small">
            <div className="fake-img load"></div>

            <div className="fake-p load"></div>
            <small>/hr</small>
          </div>

          <div className="single-setting">
            <div className="fake-img load"></div>

            <div className="fake-p load"></div>
            <small>Appstore</small>
          </div>

          <div className="single-setting">
            <div className="fake-img load"></div>

            <div className="fake-p load"></div>
            <small>Playstore</small>
          </div>

          <div className="single-setting small">
            <div className="fake-img load"></div>

            <div className="fake-p load"></div>
            <small>fps</small>
          </div>
        </div>
      </div>
    </div>
    
    </>
  );
}

export default CompatibleGamesSectionSkeletonLoader;
