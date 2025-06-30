import { formatSize } from "../../../../libs/size";
import "./RequirementSection.css"

type Requirements = {
    operatingSystem: string;
    processor: string;
    gpu: string;
    ram: number;
    storageSize: {
      androidSize : number,
      iosSize : number
    };
    additionalFeatures: string;
  };

  type requirementsProps = {
    minimumRequirements: Requirements;
    recommendedRequirements: Requirements;
  };

function RequirementSection({minimumRequirements, recommendedRequirements} : requirementsProps) {
    const a = Object.entries(minimumRequirements)

  return (
    <div className="requirements-container">
      <div className="requirements-inner">
        <table>
          <tr>
            <th className="t-head">Specification</th>

            <th className="t-head">Minimum Requirements</th>
          </tr>

          <tr>
            <td>Operating System</td>
            <td>{minimumRequirements.operatingSystem}</td>
          </tr>

          <tr>
            <td>Processor(CPU)</td>
            <td>{minimumRequirements.processor}</td>
          </tr>

          <tr>
            <td>Graphics Processor (GPU)</td>
            <td>{minimumRequirements.gpu}</td>
          </tr>

          <tr>
            <td>RAM(GB)</td>
            <td>{minimumRequirements.ram}</td>
          </tr>
          <tr>
            <td>Storage(GB)</td>
            <td>
              <div className="android-ios-size">
              <div className="android-size">
                <p>{formatSize(minimumRequirements?.storageSize?.androidSize)}<small>Android</small></p>
              </div>

              <hr />

              <div className="ios-size">
                <p>{formatSize(minimumRequirements?.storageSize?.iosSize)}<small>iOS</small></p>
              </div>
            </div>
            </td>
          </tr>
          <tr>
            <td>Additional Features</td>
            <td>{minimumRequirements.additionalFeatures}</td>
          </tr>
        </table>

        <table className="recommended">
          <tr>
            <th className="t-head">Specification</th>

            <th className="t-head">Recommended Requirements</th>
          </tr>

          <tr>
            <td>Operating System</td>
            <td>{recommendedRequirements.operatingSystem}</td>
          </tr>

          <tr>
            <td>Processor(CPU)</td>
            <td>{recommendedRequirements.processor}</td>
          </tr>

          <tr>
            <td>Graphics Processor (GPU)</td>
            <td>{recommendedRequirements.gpu}</td>
          </tr>

          <tr>
            <td>RAM(GB)</td>
            <td>{recommendedRequirements.ram}</td>
          </tr>
          <tr>
            <td>Storage</td>
            <td>

              <div className="android-ios-size">
              <div className="android-size">
                <p>{formatSize(recommendedRequirements?.storageSize?.androidSize)}<small>Android</small></p>
              </div>

              <hr />

              <div className="ios-size">
                <p>{formatSize(recommendedRequirements?.storageSize?.iosSize)}<small>iOS</small></p>
              </div>

            </div>
            </td>
          </tr>
          <tr>
            <td>Additional Features</td>
            <td>{recommendedRequirements.additionalFeatures}</td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default RequirementSection