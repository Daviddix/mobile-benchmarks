import CompatibleGame from "./Components/CompatibleGame/CompatibleGame";
import "./PhoneInfo.css";
import testPhoneImage from "./assets/images/phone-test.jpg";

function PhoneInfo() {
  return (
    <main className="phone-info-main">
      <div className="phone-info-inner">
        <img src={testPhoneImage} alt="phone info" className="phone-image" />

        <div className="phone-info-text">
          <h2>Samsung Galaxy A15 5G</h2>

          <div className="other-phone-info">
            <div className="single-phone-info">
              <h3>General Compatibility</h3>
              <p>60%</p>
            </div>

            <div className="single-phone-info">
              <h3>Storage</h3>
              <p>
                6GB <small>RAM</small> - 128GB <small>ROM</small>
              </p>
            </div>

            <div className="single-phone-info">
              <h3>CPU</h3>
              <p>Helio G99</p>
            </div>

            <div className="single-phone-info">
              <h3>Average Rating</h3>
              <p>
                5.5<small>(213)</small>
              </p>
            </div>

            <div className="single-phone-info">
              <h3>GPU</h3>
              <p>Mali-G913</p>
            </div>

            <div className="single-phone-info">
              <h3>Display</h3>
              <p>
                1290<small>p</small> - 90<small>Hz</small>
              </p>
            </div>

            <div className="single-phone-info">
              <h3>Geekbench</h3>
              <p>2850</p>
            </div>

            <div className="single-phone-info">
              <h3>AnTuTu</h3>
              <p>1234</p>
            </div>

            <div className="single-phone-info">
              <h3>3D Mark</h3>
              <p>3600</p>
            </div>
          </div>
        </div>
      </div>

      <section className="compatible-games">
        <div className="compatible-games-inner">
          <h1>Compatible Games</h1>

          <div className="compatible-games-container">
          
          <CompatibleGame />
          <CompatibleGame />

          </div>


        </div>
      </section>
    </main>
  );
}

export default PhoneInfo;
