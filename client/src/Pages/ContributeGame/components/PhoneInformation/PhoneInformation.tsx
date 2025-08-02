import { Link, useNavigate, useSearchParams } from "react-router";
import "./PhoneInformation.css";
import { useAtom } from "jotai";
import { contributeStepAtom } from "../../shared_state/state";
import { useState } from "react";
import ErrorText from "../GameInformation/components/GameInformationForm/components/ErrorText";

type phoneInformationProps = {
  contributeGameData: contributeGameDataType | null;
  setContributeGameData: React.Dispatch<
    React.SetStateAction<contributeGameDataType | null>
  >;
};

type phoneInformationDataType = {
  phoneName: string;
  phoneRam: number | undefined;
  phoneRom: number | undefined;
};

type contributePhoneDataError = {
  phoneNameError?: string;
  phoneRamError?: string;
  phoneRomError?: string;
};

function PhoneInformation({
  contributeGameData,
  setContributeGameData,
}: phoneInformationProps) {
  const [phoneInformationData, setPhoneInformationData] =
    useState<phoneInformationDataType>({
      phoneName: "",
      phoneRam: undefined,
      phoneRom: undefined,
    });
  const [phoneInformationDataError, setPhoneInformationDataError] =
    useState<contributePhoneDataError | null>(null);
  const navigate = useNavigate();

  function inputHasErrors(phoneData: phoneInformationDataType) {
    const { phoneName, phoneRam, phoneRom } = phoneData;

    const defaultMessage =
      "An error occurred with the value you entered, please check it and try again";

    if (phoneName.trim() == "" || typeof phoneName !== "string") {
      setPhoneInformationDataError((prev) => {
        return {
          ...prev,
          phoneNameError: defaultMessage,
        };
      });
      return true;
    } else if (phoneRam == 0 || typeof phoneRam !== "number") {
      setPhoneInformationDataError((prev) => {
        return {
          ...prev,
          phoneRamError: "An error occurred with the RAM value you entered, Please check the value and try again",
        };
      });
      return true;
    } else if (phoneRom == 0 || typeof phoneRom !== "number") {
      setPhoneInformationDataError((prev) => {
        return {
          ...prev,
          phoneRomError: "An error occurred with the ROM value you entered, Please check the value and try again",
        };
      });
      return true;
    }

    return false;
  }

  function validateInput() {
    setPhoneInformationDataError(null);

    const isError = inputHasErrors(phoneInformationData);

    if (isError) {
      return;
    }

    setContributeGameData({
      phoneInfo: { ...phoneInformationData },
      gameInfo: [],
    });

    return true;
  }

  return (
    <>
      <form className="contribute-phone-form">
        <div>
          <label htmlFor="phone-name">Phone Name</label>
          <input
            required
            type="text"
            name="phoneName"
            onChange={(e) => {
              setPhoneInformationDataError(null)
              setPhoneInformationData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }));
            }}
            value={phoneInformationData.phoneName}
            id="phone-name"
            placeholder="Samsung Galaxy A15"
          />

          {phoneInformationDataError?.phoneNameError && (
            <ErrorText error={phoneInformationDataError?.phoneNameError} />
          )}
        </div>

        <div className="two-input">
          <label htmlFor="storage">Storage Variant</label>

          <div>
            <input
              required
              id="storage"
              onChange={(e) => {
                setPhoneInformationDataError(null)
                setPhoneInformationData((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.valueAsNumber,
                }));
              }}
              value={phoneInformationData.phoneRam}
              type="number"
              name="phoneRam"
              placeholder="RAM"
            />

            <input
              required
              onChange={(e) => {
                setPhoneInformationDataError(null)
                setPhoneInformationData((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.valueAsNumber,
                }));
              }}
              value={phoneInformationData.phoneRom}
              type="number"
              name="phoneRom"
              placeholder="ROM"
            />
          </div>
        </div>
        {phoneInformationDataError?.phoneRamError && (
          <ErrorText error={phoneInformationDataError?.phoneRamError} />
        )}
        {phoneInformationDataError?.phoneRomError && (
          <ErrorText error={phoneInformationDataError?.phoneRomError} />
        )}
      </form>

      <button
        onClick={() => {
          validateInput() ? navigate(`/contribute/game?step=2`) : "";
        }}
        className="next"
      >
        Next
      </button>
    </>
  );
}

export default PhoneInformation;
