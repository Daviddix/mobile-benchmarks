import Logo from "/logo.svg";
import "./Disclaimer.css"

function Disclaimer() {
  return (
    <main className="disclaimer-main">
      <div className="disclaimer-inner">
        <img src={Logo} alt="Logo" className="disclaimer-logo" />

        <h1>Disclaimer</h1>

        <div className="intro">
        <p>
          <b>MobileBenchmarks</b> is a project built to help users discover
          games that are compatible with specific mobile devices, based on
          real-world performance observations. All compatibility data and
          performance insights shown on this site are manually gathered through
          direct observation of publicly available gameplay footage.
        </p>
        </div>


        <h2>How We Collect Data</h2>

        <div>
          <h3>Gameplay Performance</h3>
          <p>
            FPS data, lag behavior, resolution, and general performance are
            monitored by watching gameplay videos on platforms like YouTube.
            These observations are manually reviewed, and data is recorded into
            our database accordingly. This process is done for each game-device
            pairing to ensure relevance and context.
          </p>
        </div>

        <div>
          <h3>Device & Game Specifications:</h3>
          <p>
            Technical specs (e.g., chipset, RAM, GPU) and game details (e.g.,
            engine, release year) are sourced from trusted public resources,
            such as official game sites, manufacturer product pages, and mobile
            spec databases like:
            <ul>
              <li>GSMArena</li>
              <li>TechRadar</li>
              <li>Slot.ng</li>
            </ul>
          </p>
        </div>

        <div>
          <h3>Credits – YouTube Channels</h3>
          <p>
            We’d like to acknowledge and give credit to the content creators
            whose gameplay recordings help power this platform. Their efforts
            make this project possible. Some of the featured YouTube channels
            include:
            <ul>
              <li><a target="_blank" href="https://www.youtube.com/@WesleiFreitas1/">Wesley Freitas</a></li>
              <li><a target="_blank" href="https://www.youtube.com/@InfoFull">Info Full</a></li>

              <li><a target="_blank" href="https://www.youtube.com/@ThejVlogStories">The j Vlog Stories</a></li>

              <li><a target="_blank" href="https://www.youtube.com/@9to5Techy">9TO5TECH</a></li>

              <li><a target="_blank" href="https://www.youtube.com/@UnBoxChing">UnBox Ching</a></li>

              <li><a target="_blank" href="https://www.youtube.com/@gadget100indonesia/">Gadget100</a></li>

              <li><a target="_blank" href="https://www.youtube.com/@ictfix">Ictfix.net</a></li>

              <li><a target="_blank" href="https://www.youtube.com/@phonegaming01">Phone Gaming</a></li>

              <li><a target="_blank" href="https://www.youtube.com/@EufracioLópez502">Eufracio López 502</a></li>

              <li><a target="_blank" href="https://www.youtube.com/@TecnoAndroidCarlosPosada/search">Stivenson Contreras</a></li>
            </ul>
          </p>
        </div>

        <div>
          <h3>⚠️ Disclaimer</h3>
          <p>
            While we strive for accuracy and consistency, performance results
            may vary depending on software updates, thermal conditions,
            background processes, and firmware differences. Benchmark data
            should be treated as indicative not absolute. This platform is
            currently in beta, and data is constantly being reviewed, updated,
            and expanded. We welcome user feedback and community contributions.
          </p>
        </div>
      </div>
    </main>
  );
}

export default Disclaimer;
