import Countdown from "react-countdown";
import { StatBar } from "../stats/StatBar";
import { Histogram } from "../stats/Histogram";
import { GameStats } from "../../lib/localStorage";
import { shareStatus } from "../../lib/share";
import { tomorrow } from "../../lib/words";
import { BaseModal } from "./BaseModal";
import {
  STATISTICS_TITLE,
  GUESS_DISTRIBUTION_TEXT,
  NEW_WORD_TEXT,
  SHARE_TEXT,
  // MORE_TEXT,
} from "../../constants/strings";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  guesses: string[];
  gameStats: GameStats;
  isGameLost: boolean;
  isGameWon: boolean;
  handleShare: () => void;
  isHardMode: boolean;
};

export const StatsModal = ({
  isOpen,
  handleClose,
  guesses,
  gameStats,
  isGameLost,
  isGameWon,
  handleShare,
  isHardMode,
}: Props) => {

  const openInNewTab = () => {
    const anchor = document.createElement('a');
    anchor.href = 'https://www.more.wordle3.in/';
    anchor.target = '_blank'
    anchor.click();
  }

  if (gameStats.totalGames <= 0) {
    return (
      <BaseModal
        title={STATISTICS_TITLE}
        isOpen={isOpen}
        handleClose={handleClose}
      >
        <StatBar gameStats={gameStats} />
      </BaseModal>
    );
  }
  return (
    <BaseModal
      title={STATISTICS_TITLE}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <StatBar gameStats={gameStats} />

      <h4 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
        {GUESS_DISTRIBUTION_TEXT}
      </h4>
      <Histogram gameStats={gameStats} />

      <button
        type="button"
        className=" mr-10 mt-2 w-1/3 rounded-md border border-sky500 px-1 py-1 bg-sky-600 text-l font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-sky-500 sm:text-xl"
        onClick={() => {
          shareStatus(guesses, isGameLost, isHardMode);
          handleShare();
        }}
      >
        {SHARE_TEXT}
      </button>

      <button
              type='button'
              className=" mt-2 w-1/3 rounded-md border border-sky500 px-1 py-1 bg-sky-600 text-l font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:text-xl"
              onClick={() => {
                openInNewTab();
              }}
            >
             Play More 
            </button>




      {(isGameLost || isGameWon) && (
        <div className="mt-5 sm:mt-6 columns-2 dark:text-white">
          <div>
            <h5>{NEW_WORD_TEXT}</h5>
            <Countdown
              className="text-lg font-medium text-gray-900 dark:text-gray-100"
              date={tomorrow}
              daysInHours={true}
            />
          </div>
        </div>
      )}
    </BaseModal>
  );
};
